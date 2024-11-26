import { RouteMiddleware, RouteMiddlewareContext } from './types';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { checkRouteAccess } from './config/routes.config';

/**
 * 权限检查中间件
 * @description 检查路由访问权限并重定向
 */
export const authMiddleware: RouteMiddleware = async (
  context: RouteMiddlewareContext,
  next: () => Promise<void>
) => {
  const request = context.request as NextRequest;
  const path = request.nextUrl.pathname;
  
  const token = await getToken({ req: request });
  
  const hasAccess = checkRouteAccess(
    path,
    token?.roles as string[],
    token?.permissions as string[]
  );
  
  if (!hasAccess) {
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }
    
    return NextResponse.redirect(new URL('/403', request.url));
  }
  
  await next();
};

/**
 * 日志中间件
 * @description 记录路由变化
 */
export const loggerMiddleware: RouteMiddleware = async (
  context: RouteMiddlewareContext,
  next: () => Promise<void>
) => {
  const startTime = Date.now();
  console.log(`[Router] Navigating to: ${context.path}`);

  try {
    await next();
  } finally {
    const duration = Date.now() - startTime;
    console.log(`[Router] Navigation completed in ${duration}ms`);
  }
};

/**
 * 性能监控中间件
 * @description 监控路由性能
 */
export const performanceMiddleware: RouteMiddleware = async (
  context: RouteMiddlewareContext,
  next: () => Promise<void>
) => {
  const startTime = performance.now();

  try {
    await next();
  } finally {
    const duration = performance.now() - startTime;
    
    if (typeof window !== 'undefined') {
      window.performance.mark(`route-${context.path}-end`);
      window.performance.measure(
        `route-${context.path}`,
        `route-${context.path}-start`,
        `route-${context.path}-end`
      );
    }

    if (duration > 1000) {
      console.warn(`[Performance] Slow navigation to ${context.path}: ${duration.toFixed(2)}ms`);
    }
  }
};

/**
 * 缓存中间件
 * @description 处理路由缓存
 */
export const cacheMiddleware: RouteMiddleware = async (
  context: RouteMiddlewareContext,
  next: () => Promise<void>
) => {
  const { meta, path } = context;

  if (meta?.cache) {
    console.log(`[Cache] Route cache enabled for: ${path}`);
  }

  await next();
};

/**
 * 布局中间件
 * @description 处理路由布局
 */
export const layoutMiddleware: RouteMiddleware = async (
  context: RouteMiddlewareContext,
  next: () => Promise<void>
) => {
  const { meta } = context;

  if (meta?.layout) {
    console.log(`[Layout] Using layout: ${meta.layout}`);
  }

  await next();
};

/**
 * 组合多个中间件
 * @description 按顺序执行多个中间件
 */
export const composeMiddleware = (
  ...middlewares: RouteMiddleware[]
): RouteMiddleware => {
  return async (context: RouteMiddlewareContext, next: () => Promise<void>) => {
    const dispatch = async (index: number): Promise<void> => {
      if (index >= middlewares.length) {
        return next();
      }

      return middlewares[index](context, () => dispatch(index + 1));
    };

    return dispatch(0);
  };
};

/**
 * 默认中间件
 * @description 组合日志、性能监控、缓存、布局和权限检查中间件
 */
export const defaultMiddleware = composeMiddleware(
  loggerMiddleware,
  performanceMiddleware,
  cacheMiddleware,
  layoutMiddleware,
  authMiddleware
);
