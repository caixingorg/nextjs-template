import { ReactNode } from 'react';

/**
 * 路由元数据
 */
export interface RouteMeta {
  title?: string;           // 页面标题
  permissions?: string[];   // 所需权限
  layout?: string;         // 布局名称
}

/**
 * 路由配置
 */
export interface RouteConfig {
  path: string;                 // 路由路径
  component?: ReactNode;        // 路由组件
  children?: RouteConfig[];     // 子路由
  redirect?: string;           // 重定向路径
  meta?: RouteMeta;            // 路由元数据
}

/**
 * 路由中间件上下文
 */
export interface RouteMiddlewareContext {
  path: string;                // 当前路径
  params: Record<string, string>;  // 路由参数
  query: Record<string, string>;   // 查询参数
  meta?: RouteMeta;            // 路由元数据
}

/**
 * 路由中间件
 */
export type RouteMiddleware = (
  context: RouteMiddlewareContext,
  next: () => Promise<void>
) => Promise<void>;

/**
 * 路由守卫上下文
 */
export interface RouteGuardContext {
  pathname: string;       // 当前路径
  meta?: RouteMeta;      // 路由元数据
  permissions?: string[]; // 用户权限
}

/**
 * 路由守卫函数
 */
export type RouteGuard = (context: RouteGuardContext) => Promise<boolean | string>;

/**
 * 路由钩子
 */
export interface RouteHooks {
  beforeEach?: RouteGuard[];   // 全局前置守卫
  afterEach?: RouteMiddleware[]; // 全局后置中间件
}
