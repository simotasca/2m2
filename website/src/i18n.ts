const i18n = {
  canonical: "it",
  locales: ["it", "en"],
  values: new Map([
    ["it", "it_IT"],
    ["en", "en_EN"],
  ]),
} as const;

export type Locale = (typeof i18n.locales)[number];

export default i18n;
