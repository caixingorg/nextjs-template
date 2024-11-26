/**
 * HTTP请求缓存
 * @description 提供HTTP请求缓存功能，支持TTL和LRU缓存策略
 * @module services/http/cache
 */

import { apiConfig } from '@/config/api';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CacheConfig {
  ttl: number;
  maxSize: number;
}

/**
 * LRU缓存实现
 */
class LRUCache<T> {
  private cache: Map<string, CacheItem<T>>;
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.cache = new Map();
    this.config = config;
  }

  /**
   * 获取缓存项
   * @param key - 缓存键
   */
  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }

    // 检查TTL
    if (Date.now() - item.timestamp > this.config.ttl) {
      this.cache.delete(key);
      return null;
    }

    // 更新访问顺序
    this.cache.delete(key);
    this.cache.set(key, item);

    return item.data;
  }

  /**
   * 设置缓存项
   * @param key - 缓存键
   * @param data - 缓存数据
   */
  set(key: string, data: T): void {
    // 检查缓存大小
    if (this.cache.size >= this.config.maxSize) {
      // 删除最久未使用的项
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * 删除缓存项
   * @param key - 缓存键
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear();
  }
}

/**
 * HTTP请求缓存实例
 */
export const requestCache = new LRUCache<any>({
  ttl: apiConfig.cache.ttl,
  maxSize: apiConfig.cache.maxSize,
});

/**
 * 生成缓存键
 * @param url - 请求URL
 * @param params - 请求参数
 */
export function generateCacheKey(url: string, params?: any): string {
  if (!params) {
    return url;
  }
  return `${url}:${JSON.stringify(params)}`;
}

export default {
  requestCache,
  generateCacheKey,
};
