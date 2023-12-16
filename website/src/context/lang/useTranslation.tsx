"use client";

import { getTranslationFactories } from "@/lib/shared/lang";
import { useContext } from "react";
import { TranslationContext } from "./TranslationClientComponent";

export default function useTranslation(base?: string) {
  const { currentLang, ...translation } = useContext(TranslationContext);
  return { ...getTranslationFactories(translation, base), currentLang };
}
