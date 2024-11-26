/**
 * 缓存项接口
 */
export interface CacheItem<T = any> {
  key: string;
  value: T;
  timestamp: number;
  expiration?: number;
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * 缓存存储接口
 */
export interface CacheStorage {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, options?: CacheOptions): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
  keys(): Promise<string[]>;
}

/**
 * 缓存选项接口
 */
export interface CacheOptions {
  ttl?: number;  // 过期时间（毫秒）
  tags?: string[];  // 缓存标签
  metadata?: Record<string, any>;  // 元数据
}

/**
 * 缓存策略接口
 */
export interface CacheStrategy {
  shouldCache(key: string, value: any): boolean;
  shouldInvalidate(item: CacheItem): boolean;
  getKey(key: string): string;
}

/**
 * 缓存统计接口
 */
export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  lastAccess?: number;
  lastUpdate?: number;
}

/**
 * 缓存事件类型
 */
export enum CacheEventType {
  HIT = 'hit',
  MISS = 'miss',
  SET = 'set',
  DELETE = 'delete',
  CLEAR = 'clear',
  ERROR = 'error',
  EXPIRED = 'expired'
}

/**
 * 缓存事件接口
 */
export interface CacheEvent {
  type: CacheEventType;
  key?: string;
  value?: any;
  timestamp: number;
  metadata?: Record<string, any>;
}

/**
 * 缓存监听器接口
 */
export interface CacheListener {
  onEvent(event: CacheEvent): void;
}

/**
 * 缓存查询选项
 */
export interface CacheQueryOptions {
  tags?: string[];
  pattern?: string;
  expired?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * 缓存同步选项
 */
export interface CacheSyncOptions {
  strategy: 'merge' | 'overwrite' | 'keepNewer';
  source: CacheStorage;
  target: CacheStorage;
  filter?: (item: CacheItem) => boolean;
}

/**
 * 缓存压缩选项
 */
export interface CacheCompressionOptions {
  enabled: boolean;
  algorithm?: 'gzip' | 'deflate';
  threshold?: number;  // 最小压缩大小（字节）
}

/**
 * 缓存持久化选项
 */
export interface CachePersistenceOptions {
  enabled: boolean;
  storage: 'localStorage' | 'indexedDB' | 'custom';
  key?: string;
  maxSize?: number;  // 最大存储大小（字节）
  autoSync?: boolean;  // 自动同步
  syncInterval?: number;  // 同步间隔（毫秒）
}

/**
 * 缓存配置接口
 */
export interface CacheConfig {
  storage?: CacheStorage;
  strategy?: CacheStrategy;
  defaultTTL?: number;
  maxSize?: number;
  maxEntries?: number;
  compression?: CacheCompressionOptions;
  persistence?: CachePersistenceOptions;
  listeners?: CacheListener[];
}
