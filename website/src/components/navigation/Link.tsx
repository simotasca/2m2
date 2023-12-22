"use client";

import type { Locale } from "@/i18n";
import i18n from "@/i18n";
import NextLink from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink> & HrefSpec;

const Link = ({ href, lang, children, ...props }: Props) => {
  return (
    <NextLink href={translateRoute({ href, lang })} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;

export type HrefSpec =
  | { href: string; lang?: Locale }
  | { href?: string; lang: Locale };

function langHref({ href, lang }: { href?: string; lang?: string }) {
  let hrefOk = href || "";
  let langOk = lang ? "/" + lang : "";
  // trim left href
  while (hrefOk.startsWith("/")) hrefOk = hrefOk.slice(1);
  return `${langOk}/${hrefOk}`;
}

function currLang(): Locale {
  if (!global.window) return i18n.canonical;
  let chunks = global.window.location.pathname.split("/");
  /* @ts-ignore */
  if (isLang(chunks[1])) return chunks[1];
  else return i18n.canonical;
}

function isLang(lan: string) {
  return (i18n.locales as readonly string[]).includes(lan);
}

/**
 * Se c'è solo href senza lingua gli aggiunge la lingua corrente
 * Se la lingua è nell'href lascio quella (a meno che non sia specificato anche il campo lingua)
 * se c'è solo lingua senza href ritorna la location corrente con lingua specificata
 * se ci sono entrambi li combina
 */
export function translateRoute({ href, lang }: HrefSpec): string {
  if (href && (href.startsWith("#") || !href.startsWith("/"))) {
    return href;
  }

  let hrefOk: string = href || window.location.pathname;
  let langOk: string | undefined = undefined;
  let chunks = hrefOk.split("/");
  let isLangInHref = (i18n.locales as readonly string[]).includes(chunks[1]);

  if (lang) {
    langOk = lang;
  } else {
    let langChunk = chunks[1];
    langOk = isLangInHref ? langChunk : currLang();
  }

  if (langOk == i18n.canonical) {
    langOk = undefined;
  }

  if (isLangInHref) {
    if (langOk)
      return langHref({ lang: langOk, href: chunks.slice(2).join("/") });
    else {
      return langHref({ href: hrefOk });
    }
  } else {
    return langHref({ href: hrefOk, lang: langOk });
  }
}
