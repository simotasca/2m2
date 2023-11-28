"use client";

import i18n from "@/i18n";
import { PropsWithChildren, createContext } from "react";

export const TranslationContext = createContext<{
  [key: string]: any;
  currentLang: string;
}>({ currentLang: i18n.canonical });

export default function TranslationClientComponent({
  children,
  value,
}: PropsWithChildren<{ value: any }>) {
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}
