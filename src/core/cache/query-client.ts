import { QueryClient } from '@tanstack/react-query';
import { createQueryClientConfig } from './config/cache.config';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { CACHE_CONFIG } from './config/cache.config';

// 创建查询客户端
export const queryClient = new QueryClient(createQueryClientConfig());

// 配置持久化（仅在客户端）
if (typeof window !== 'undefined' && CACHE_CONFIG.persistence.storage) {
  const persister = createSyncStoragePersister({
    storage: CACHE_CONFIG.persistence.storage,
    key: CACHE_CONFIG.persistence.key,
    throttleTime: 1000,
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: CACHE_CONFIG.persistence.maxAge,
  });
}

// 导出预配置的查询选项
export const queryOptions = {
  user: {
    queryKey: ['user'],
    ...CACHE_CONFIG.queries.user,
  },
  settings: {
    queryKey: ['settings'],
    ...CACHE_CONFIG.queries.settings,
  },
  static: {
    ...CACHE_CONFIG.queries.static,
  },
} as const;
