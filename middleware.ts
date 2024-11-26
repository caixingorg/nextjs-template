import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';

export default createMiddleware({
  // 配置支持的语言
  locales: locales,
  // 默认语言
  defaultLocale: defaultLocale,
  // 总是显示语言前缀
  localePrefix: 'always'
});

export const config = {
  // 匹配所有路径，除了api、_next、public等静态资源
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};