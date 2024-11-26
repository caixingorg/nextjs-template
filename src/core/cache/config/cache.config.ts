import { QueryClientConfig } from '@tanstack/react-query';

export const CACHE_CONFIG = {
  // 全局缓存配置
  global: {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
  },
  
  // 特定查询配置
  queries: {
    user: {
      staleTime: 1000 * 60 * 15, // 15 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
    },
    settings: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
    static: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
  
  // 持久化配置
  persistence: {
    key: 'app-cache',
    storage: typeof window !== 'undefined' ? window.localStorage : null,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
} as const;

export const createQueryClientConfig = (): QueryClientConfig => ({
  defaultOptions: {
    queries: {
      ...CACHE_CONFIG.global,
      suspense: true,
    },
    mutations: {
      retry: CACHE_CONFIG.global.retry,
      retryDelay: CACHE_CONFIG.global.retryDelay,
    },
  },
});
