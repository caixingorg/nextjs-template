/**
 * HTTP服务
 * @description 统一导出HTTP相关服务
 * @module services/http
 */

export * from './client';
export * from './cache';
export * from './retry';

import httpClient from './client';
import cache from './cache';
import retry from './retry';

export default {
  ...httpClient,
  cache,
  retry,
};
