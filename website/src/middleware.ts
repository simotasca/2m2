import { match } from "@formatjs/intl-localematcher";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import i18n from "./i18n";
import { createServerSideClient } from "./lib/server/supabase";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  if (!isPageUrl(req.nextUrl)) return;

  // console.log("MIDDLEWARE", req.nextUrl.toString());

  const res = NextResponse.next();

  // Refresh supabase session if expired - required for Server Components
  const supabase = createServerSideClient({ cookies });
  await supabase.auth.getSession();

  const { pathname } = req.nextUrl;
  let locale: string | undefined = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!!locale) {
    // has locale
    setUrlHeader(res, locale);
    return res;
  }

  locale = getLocale(req.headers);
  req.nextUrl.pathname = `/${locale}${pathname}`;
  setUrlHeader(res, locale);

  if (locale === i18n.canonical) {
    // don't display canonical lang
    return NextResponse.rewrite(req.nextUrl);
  } else {
    return NextResponse.redirect(req.nextUrl);
  }
}

function getLocale(headers: Headers) {
  let languages = new Negotiator({
    headers: headers as unknown as Negotiator.Headers,
  }).languages(i18n.locales as [string, string]);
  return match(languages, i18n.locales, i18n.canonical);
}

function setUrlHeader(res: NextResponse, locale: string) {
  res.headers.set("X-Locale-For-Next-I18N", locale);
}

function isPageUrl(url: URL) {
  if (url.pathname.startsWith("/_next/")) return false;
  if (url.pathname.startsWith("/api/")) return false;
  if (url.pathname.startsWith("/favicon.ico")) return false;
  if (url.pathname.startsWith("/assets/")) return false;
  if (url.pathname.startsWith("/auth-templates/")) return false;
  if (url.pathname.startsWith("/fonts/")) return false;
  return true;
}
