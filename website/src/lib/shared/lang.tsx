import { Fragment } from "react";
import { walk } from "./object";

export const defaultRich: RichTextMappers = {
  red: (slot) => <span className="text-red-500">{slot}</span>,
  br: () => <br />,
  b: (slot) => <b>{slot}</b>,
};

export function getTranslationFactories(translation: any, base?: string) {
  const prefix = base ? base + "." : "";

  function t(key: string | string[], fallback?: string) {
    if (typeof key !== "string") {
      key = key.join(".");
    }
    return walk(translation, prefix + key) || fallback || "";
  }

  function r(key: string, mappers: RichTextMappers = defaultRich) {
    const val = t(key);
    const parsed = parseRich(val, mappers);
    return parsed;
  }

  return { t, r };
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
