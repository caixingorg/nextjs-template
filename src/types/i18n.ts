export type Locale = 'en' | 'zh' | 'ja';

export type LocalePrefix = 'always' | 'never';

export interface LocaleConfig {
  defaultLocale: Locale;
  locales: Locale[];
  localePrefix: LocalePrefix;
}