import "server-only";

import type skDict from "../../dictionaries/sk.json";

export type Dictionary = typeof skDict;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  sk: () =>
    import("../../dictionaries/sk.json").then((m) => m.default as Dictionary),
  en: () =>
    import("../../dictionaries/en.json").then((m) => m.default as Dictionary),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["sk", "en"];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
