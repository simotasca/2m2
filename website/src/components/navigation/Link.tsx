"use client";

import useNavigate from "@/hooks/useNavigate";
import type { Locale } from "@/i18n";
import i18n from "@/i18n";
import { translateRoute } from "@/lib/client/lang";
import NextLink from "next/link";
import { useEffect, useState, type PropsWithChildren } from "react";

export type HrefSpec = { href?: string; lang?: Locale };

type Props = PropsWithChildren<HrefSpec & { className?: string }>;

export default function Link({
  href: userHref,
  lang,
  children,
  className,
}: Props) {
  const [href, setHref] = useState("#");

  useEffect(() => {
    setHref(translateRoute({ href: userHref, lang }));
  }, []);
  return (
    <NextLink className={className} href={href}>
      {children}
    </NextLink>
  );
}
