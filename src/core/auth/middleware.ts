import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PermissionCheck, RoleCheck } from './types';

/**
 * 路由权限配置
 */
export interface RoutePermissionConfig {
  path: string;
  permissions?: PermissionCheck[];
  roles?: RoleCheck[];
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * 路由权限配置列表
 */
export const routePermissions: RoutePermissionConfig[] = [
  {
    path: '/admin',
    roles: ['admin'],
    requireAuth: true,
    redirectTo: '/login'
  },
  {
    path: '/dashboard',
    permissions: ['view:dashboard'],
    requireAuth: true,
    redirectTo: '/login'
  }
];

/**
 * 检查路由权限
 */
function checkRoutePermission(
  pathname: string,
  token?: string | null
): RoutePermissionConfig | null {
  // 查找匹配的路由配置
  const matchedRoute = routePermissions.find(route => 
    pathname.startsWith(route.path)
  );

  if (!matchedRoute) {
    return null;
  }

  // 检查是否需要认证
  if (matchedRoute.requireAuth && !token) {
    return matchedRoute;
  }

  return null;
}

/**
 * 权限中间件
 */
export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 忽略静态资源和API路由
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }

  // 从cookie中获取token
  const token = request.cookies.get('auth-token')?.value;

  // 检查路由权限
  const permissionCheck = checkRoutePermission(pathname, token);

  // 如果需要重定向
  if (permissionCheck?.redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = permissionCheck.redirectTo;
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * 中间件配置
 */
export const config = {
  matcher: [
    /*
     * 匹配所有路由除了:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
