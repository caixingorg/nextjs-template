import { EventEmitter } from 'events';
import { RouteMetadata } from './types';

/**
 * 路由事件类型
 */
export enum RouterEventType {
  BEFORE_ROUTE_CHANGE = 'beforeRouteChange',
  AFTER_ROUTE_CHANGE = 'afterRouteChange',
  ROUTE_CHANGE_ERROR = 'routeChangeError',
  HASH_CHANGE = 'hashChange',
  ROUTE_LOADING = 'routeLoading',
  ROUTE_LOADED = 'routeLoaded'
}

/**
 * 路由事件接口
 */
export interface RouterEvent {
  type: RouterEventType;
  from?: string;
  to: string;
  timestamp: number;
  metadata?: RouteMetadata;
  error?: Error;
}

/**
 * 路由事件监听器
 */
export type RouterEventListener = (event: RouterEvent) => void;

/**
 * 路由事件管理器
 */
class RouterEventManager {
  private emitter: EventEmitter;
  private static instance: RouterEventManager;

  private constructor() {
    this.emitter = new EventEmitter();
    // 设置最大监听器数量
    this.emitter.setMaxListeners(20);
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): RouterEventManager {
    if (!RouterEventManager.instance) {
      RouterEventManager.instance = new RouterEventManager();
    }
    return RouterEventManager.instance;
  }

  /**
   * 添加事件监听器
   */
  public on(event: RouterEventType, listener: RouterEventListener): void {
    this.emitter.on(event, listener);
  }

  /**
   * 添加一次性事件监听器
   */
  public once(event: RouterEventType, listener: RouterEventListener): void {
    this.emitter.once(event, listener);
  }

  /**
   * 移除事件监听器
   */
  public off(event: RouterEventType, listener: RouterEventListener): void {
    this.emitter.off(event, listener);
  }

  /**
   * 移除特定事件的所有监听器
   */
  public removeAllListeners(event?: RouterEventType): void {
    this.emitter.removeAllListeners(event);
  }

  /**
   * 触发事件
   */
  public emit(event: RouterEvent): void {
    this.emitter.emit(event.type, event);
  }

  /**
   * 获取特定事件的监听器数量
   */
  public listenerCount(event: RouterEventType): number {
    return this.emitter.listenerCount(event);
  }

  /**
   * 获取特定事件的所有监听器
   */
  public listeners(event: RouterEventType): Function[] {
    return this.emitter.listeners(event);
  }
}

// 导出单例实例
export const routerEvents = RouterEventManager.getInstance();
