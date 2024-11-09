/**
 * Path: src/middleware.ts
 * Purpose: Combined authentication and internationalization middleware
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

// 支持的语言列表
export const locales = ['en', 'zh', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// 公开路径，不需要认证
const publicRoutes = [
  '/login',
  '/register',
  '/about',
  '/products',
  '/'
] as const;

// 受保护的路由
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings'
] as const;

// 创建国际化中间件
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

// 检查是否是公开路由
function isPublicRoute(pathname: string, locale: string): boolean {
  // 移除语言前缀后检查路径
  const pathWithoutLocale = pathname.replace(`/${locale}`, '');
  return publicRoutes.includes(pathWithoutLocale as typeof publicRoutes[number]);
}

// 检查是否是受保护路由
function isProtectedRoute(pathname: string, locale: string): boolean {
  const pathWithoutLocale = pathname.replace(`/${locale}`, '');
  return protectedRoutes.includes(pathWithoutLocale as typeof protectedRoutes[number]);
}

// 中间件主函数
async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log('Current pathname:', pathname);

  // 如果是静态文件或API路由，直接返回
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 获取当前语言
  const pathnameLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  console.log('Detected locale:', pathnameLocale);

  // 如果路径中没有语言前缀，重定向到默认语言
  if (!pathnameLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  // 应用国际化中间件
  return intlMiddleware(request);
}

// 导出中间件
export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;
      const pathnameLocale = locales.find(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
      );
      const locale = pathnameLocale || defaultLocale;

      // 如果是受保护路由，需要token
      if (isProtectedRoute(pathname, locale)) {
        return !!token;
      }
      // 如果是公开路由，不需要token
      if (isPublicRoute(pathname, locale)) {
        return true;
      }
      // 默认需要token
      return !!token;
    },
  },
});

// 配置匹配路径
export const config = {
  // 匹配所有路径，除了静态文件和API路由
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};