/**
 * HTTP请求重试
 * @description 提供HTTP请求重试功能，支持指数退避策略
 * @module services/http/retry
 */

import { apiConfig } from '@/config/api';
import { HttpError } from './client';

interface RetryConfig {
  maxRetries: number;
  delay: number;
  shouldRetry?: (error: any) => boolean;
}

/**
 * 默认重试配置
 */
const defaultRetryConfig: RetryConfig = {
  maxRetries: apiConfig.retry.maxRetries,
  delay: apiConfig.retry.delay,
  shouldRetry: (error: any) => {
    // 默认只重试网络错误和5xx错误
    if (error instanceof HttpError) {
      return error.code === 'NETWORK' || (error.status && error.status >= 500);
    }
    return false;
  },
};

/**
 * 延迟执行
 * @param ms - 延迟时间（毫秒）
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 计算重试延迟时间
 * @param retryCount - 重试次数
 * @param baseDelay - 基础延迟时间
 */
function calculateDelay(retryCount: number, baseDelay: number): number {
  // 使用指数退避策略，但设置上限为30秒
  return Math.min(Math.pow(2, retryCount) * baseDelay, 30000);
}

/**
 * 重试装饰器
 * @param config - 重试配置
 */
export function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const retryConfig = { ...defaultRetryConfig, ...config };
  let retryCount = 0;

  const attempt = async (): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (
        retryCount < retryConfig.maxRetries &&
        retryConfig.shouldRetry?.(error)
      ) {
        retryCount++;
        const delayTime = calculateDelay(retryCount, retryConfig.delay);

        console.log(`🔄 Retrying request (${retryCount}/${retryConfig.maxRetries}) after ${delayTime}ms`);
        await delay(delayTime);

        return attempt();
      }

      throw error;
    }
  };

  return attempt();
}

/**
 * 重试函数
 * @param fn - 要重试的异步函数
 * @param config - 重试配置
 */
export async function retry<T>(
  fn: () => Promise<T>,
  config?: Partial<RetryConfig>
): Promise<T> {
  return withRetry(fn, config);
}

export default {
  retry,
  withRetry,
};
