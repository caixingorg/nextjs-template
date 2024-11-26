import { createI18nClient } from 'next-international/client';

export const defaultLocale = 'en';
export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const { useI18n, useScopedI18n, I18nProvider, useChangeLocale } = createI18nClient({
  en: () => import('../lang/en'),
  zh: () => import('../lang/zh'),
});
