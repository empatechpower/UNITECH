import type { Locale } from './config';

const dictionaries = {
  en: () => import('@/translations/en.json').then((m) => m.default),
  zh: () => import('@/translations/zh.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
