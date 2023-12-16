import i18n from "@/i18n";
import { headers } from "next/headers";
import { getTranslationFactories } from "../shared/lang";

export type TranslationsSpec = { [key: string]: string } | string;
export type TranslationFactories = ReturnType<typeof getTranslationFactories>;

export async function generateTranslations(
  id: TranslationsSpec,
  withFactories?: false
): Promise<[any]>;

export async function generateTranslations(
  id: TranslationsSpec,
  withFactories: true
): Promise<[any, TranslationFactories]>;

export async function generateTranslations(
  id: TranslationsSpec,
  withFactories = false
) {
  let value: any = {};

  if (typeof id === "string") {
    value = await getServerTranslation(id);
  } else {
    for (const key of Object.keys(id)) {
      value[key] = await getServerTranslation(id[key]);
    }
  }

  value.currentLang = getCurrentLang();

  if (withFactories === false) return [value];
  else return [value, getTranslationFactories(value)];
}

const translationCache = new Map<string, Map<string, Object>>();

export async function getServerTranslation(
  id: string,
  lang: string = getCurrentLang()
) {
  let translations: Map<string, Object>;

  if (translationCache.has(id)) {
    translations = translationCache.get(id)!;
  } else {
    translations = await loadTranslationsFromFiles(id);
    translationCache.set(id, translations);
  }

  const canonicalTranslation = translations.get(i18n.canonical) || {};

  if (lang === i18n.canonical) return canonicalTranslation;

  const translationWithCanonicalFallback = recursiveAssign(
    canonicalTranslation,
    translations.get(lang)
  );

  return translationWithCanonicalFallback;
}

export function getCurrentLang() {
  let lang: string = i18n.canonical;

  if (headers().has("X-Locale-For-Next-I18N")) {
    lang = headers().get("X-Locale-For-Next-I18N")!;
  }

  return lang;
}

async function loadTranslationsFromFiles(id: string) {
  const translations = new Map<string, Object>();

  // trim
  while (id.startsWith("/")) id = id.slice(1);
  while (id.endsWith("/")) id = id.slice(0, -1);

  for (const lang of i18n.locales) {
    const langJson = (
      await import(`@/lang/${id}/${lang}.json`).catch((e) => {
        if (e.code != "MODULE_NOT_FOUND") {
          console.log("Error with translation file:", id);
          console.log(" -", e.message);
        } else if (lang == i18n.canonical) {
          console.log("Alert: Canonical translation for", id, "not found");
        }
        return { default: undefined };
      })
    ).default;
    langJson && translations.set(lang, langJson);
  }

  return translations;
}

function recursiveAssign(source: any, target: any) {
  if (!source || typeof source === "string" || Array.isArray(source)) {
    return target || source;
  }
  let result: any = {};
  for (const key of Object.keys(source)) {
    if (typeof target === "string") {
      result[key] = target;
      continue;
    }

    if (!Object.hasOwn(target, key)) {
      result[key] = source[key];
      continue;
    }

    result[key] = recursiveAssign(source[key], target[key]);
  }

  for (const key of Object.keys(target)) {
    if (!Object.hasOwn(source, key)) {
      result[key] = target[key];
    }
  }
  return result;
}
