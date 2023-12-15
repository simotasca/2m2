import { walk } from "@/lib/shared/object";
import { Fragment, useContext } from "react";
import { TranslationContext } from "./TranslationClientComponent";

export const rich: RichTextMappers = {
  red: (slot) => <span className="text-red-500">{slot}</span>,
  br: () => <br />,
};

export default function useTranslation(base?: string) {
  const { currentLang, ...translation } = useContext(TranslationContext);

  const prefix = base ? base + "." : "";

  function t(key: string) {
    return walk(translation, prefix + key) || "";
  }

  function r(key: string, mappers: RichTextMappers = rich) {
    const val = t(key);
    const parsed = parseRich(val, mappers);
    return parsed;
  }

  return { t, r, currentLang };
}

interface RichTextMappers {
  [key: string]: (text: JSX.Element) => JSX.Element;
}

function parseRich(rich: string, mappers: RichTextMappers): JSX.Element {
  const openingTagRegex = /<[^>]*>/;
  const firstOpen = rich.match(openingTagRegex)?.at(0);
  const tagName = firstOpen?.slice(1, -1);
  const correspondingClose = tagName && rich.match(`</${tagName}>`)?.at(0);

  if (!firstOpen || !correspondingClose) return <>{rich}</>;

  const find = rich.match(
    new RegExp(`${firstOpen}(.*?)${correspondingClose}`, "s")
  )!;
  const [fullTag, content] = find;

  const [before, after] = rich.split(fullTag);
  const result: JSX.Element[] = [];
  before && result.push(<>{parseRich(before, mappers)}</>);
  result.push(mappers[tagName](<>{parseRich(content, mappers)}</>));
  after && result.push(<>{parseRich(after, mappers)}</>);

  return (
    <>
      {result.map((el, i) => (
        <Fragment key={i}>{el}</Fragment>
      ))}
    </>
  );
}
