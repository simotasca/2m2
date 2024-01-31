const i18n = {
  canonical: "it",
  locales: ["it", "en"],
} as const;

export type Locale = (typeof i18n.locales)[number];

export default i18n;
