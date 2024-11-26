import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { securityMiddleware } from '@/core/security';
import createI18nMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';

// Create the internationalization middleware
const i18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export function middleware(request: NextRequest) {
  // Apply security headers
  const response = securityMiddleware(request);

  // Apply internationalization
  const i18nResponse = i18nMiddleware(request);
  
  // Merge headers from both middlewares
  i18nResponse.headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
