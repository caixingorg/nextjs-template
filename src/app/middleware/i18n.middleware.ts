import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/config/i18n';

export function i18nMiddleware(request: NextRequest) {
  const handleI18n = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
  });
  
  return handleI18n(request);
}