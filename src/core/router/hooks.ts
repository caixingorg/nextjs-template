import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRouteConfig, getRouteMetadata, getBreadcrumbs } from './config';
import { RouteMetadata } from './types';
import { defaultGuard } from './guards';
import { defaultMiddleware } from './middleware';
import { routerEvents, RouterEventType } from './events';
import { useAuth } from '@/core/auth/hooks';
import { RouterError } from '@/core/router/errors';

/**
 * 路由Hook返回值
 */
interface UseRouteReturn {
  path: string;
  query: Record<string, string>;
  meta?: RouteMetadata;
  breadcrumbs: { path: string; title: string }[];
  navigate: (path: string) => Promise<void>;
  replace: (path: string) => Promise<void>;
  back: () => void;
  isLoading: boolean;
}

/**
 * 路由Hook
 * @description 提供路由相关的状态和方法
 */
export function useRoute(): UseRouteReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, permissions } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // 获取查询参数
  const query = useMemo(() => {
    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });
    return query;
  }, [searchParams]);

  // 获取路由元数据
  const meta = useMemo(() => getRouteMetadata(pathname), [pathname]);

  // 获取面包屑
  const breadcrumbs = useMemo(() => getBreadcrumbs(pathname), [pathname]);

  // 导航方法
  const navigate = useCallback(async (path: string) => {
    // 获取目标路由配置
    const route = getRouteConfig(path);
    if (!route) {
      router.push('/404');
      return;
    }

    // 创建路由上下文
    const context = {
      path,
      params: {},
      query: {},
      meta: route.meta,
      from: pathname,
      isAuthenticated,
      permissions
    };

    try {
      setIsLoading(true);
      
      // 触发路由变更前事件
      routerEvents.emit({
        type: RouterEventType.BEFORE_ROUTE_CHANGE,
        from: pathname,
        to: path,
        timestamp: Date.now(),
        metadata: route.meta
      });

      // 执行路由守卫
      const guardResult = await defaultGuard(context);
      if (typeof guardResult === 'string') {
        router.push(guardResult);
        return;
      }
      if (!guardResult) {
        return;
      }

      // 执行路由中间件
      await defaultMiddleware(context, async () => {
        router.push(path);
      });

      // 触发路由变更后事件
      routerEvents.emit({
        type: RouterEventType.AFTER_ROUTE_CHANGE,
        from: pathname,
        to: path,
        timestamp: Date.now(),
        metadata: route.meta
      });
    } catch (error) {
      // 触发路由错误事件
      routerEvents.emit({
        type: RouterEventType.ROUTE_CHANGE_ERROR,
        from: pathname,
        to: path,
        timestamp: Date.now(),
        metadata: route.meta,
        error: error instanceof Error ? error : new RouterError('Navigation failed')
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router, pathname, isAuthenticated, permissions]);

  // 替换方法
  const replace = useCallback(async (path: string) => {
    const route = getRouteConfig(path);
    if (!route) {
      router.replace('/404');
      return;
    }

    const context = {
      path,
      params: {},
      query: {},
      meta: route.meta,
      from: pathname,
      isAuthenticated,
      permissions
    };

    try {
      setIsLoading(true);

      // 触发路由变更前事件
      routerEvents.emit({
        type: RouterEventType.BEFORE_ROUTE_CHANGE,
        from: pathname,
        to: path,
        timestamp: Date.now(),
        metadata: route.meta
      });

      const guardResult = await defaultGuard(context);
      if (typeof guardResult === 'string') {
        router.replace(guardResult);
        return;
      }
      if (!guardResult) {
        return;
      }

      await defaultMiddleware(context, async () => {
        router.replace(path);
      });

      // 触发路由变更后事件
      routerEvents.emit({
        type: RouterEventType.AFTER_ROUTE_CHANGE,
        from: pathname,
        to: path,
        timestamp: Date.now(),
        metadata: route.meta
      });
    } catch (error) {
      // 触发路由错误事件
      routerEvents.emit({
        type: RouterEventType.ROUTE_CHANGE_ERROR,
        from: pathname,
        to: path,
        timestamp: Date.now(),
        metadata: route.meta,
        error: error instanceof Error ? error : new RouterError('Navigation failed')
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router, pathname, isAuthenticated, permissions]);

  // 返回方法
  const back = useCallback(() => {
    router.back();
  }, [router]);

  // 监听路由变化
  useEffect(() => {
    // 更新页面标题
    if (meta?.title) {
      document.title = meta.title;
    }

    // 更新页面描述
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta && meta?.description) {
      descriptionMeta.setAttribute('content', meta.description);
    }

    // 更新页面关键词
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta && meta?.keywords) {
      keywordsMeta.setAttribute('content', meta.keywords.join(', '));
    }

    // 触发路由加载完成事件
    routerEvents.emit({
      type: RouterEventType.ROUTE_LOADED,
      to: pathname,
      timestamp: Date.now(),
      metadata: meta
    });
  }, [meta, pathname]);

  return {
    path: pathname,
    query,
    meta,
    breadcrumbs,
    navigate,
    replace,
    back,
    isLoading
  };
}
