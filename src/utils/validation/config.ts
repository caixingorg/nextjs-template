/**
 * 配置验证工具
 * @description 用于验证环境变量和配置项的正确性
 * @module utils/validation/config
 */

import { ENV_VALIDATIONS } from '@/config/env';
import { ApiConfig } from '@/config/api';
import { AppConfig } from '@/config/app';

/**
 * 配置验证错误
 */
export class ConfigValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigValidationError';
  }
}

/**
 * 验证环境变量
 * @throws {ConfigValidationError} 当必需的环境变量缺失或格式不正确时抛出
 */
export function validateEnvVars(): void {
  // 验证必需的环境变量
  for (const key of ENV_VALIDATIONS.required) {
    if (!process.env[key]) {
      throw new ConfigValidationError(`Missing required environment variable: ${key}`);
    }
  }

  // 验证环境变量格式
  for (const [key, pattern] of Object.entries(ENV_VALIDATIONS.pattern)) {
    const value = process.env[key];
    if (value && !pattern.test(value)) {
      throw new ConfigValidationError(
        `Invalid format for environment variable ${key}: ${value}`
      );
    }
  }
}

/**
 * 验证API配置
 * @param {ApiConfig} config - API配置对象
 * @throws {ConfigValidationError} 当API配置无效时抛出
 */
export function validateApiConfig(config: ApiConfig): void {
  // 验证基础URL
  if (!config.baseURL) {
    throw new ConfigValidationError('API baseURL is required');
  }

  // 验证超时设置
  if (config.timeout <= 0) {
    throw new ConfigValidationError('API timeout must be greater than 0');
  }

  // 验证重试配置
  if (config.retry.maxRetries < 0) {
    throw new ConfigValidationError('API retry count must not be negative');
  }

  if (config.retry.delay < 0) {
    throw new ConfigValidationError('API retry delay must not be negative');
  }

  // 验证缓存配置
  if (config.cache.enabled) {
    if (config.cache.ttl <= 0) {
      throw new ConfigValidationError('Cache TTL must be greater than 0');
    }
    if (config.cache.maxSize <= 0) {
      throw new ConfigValidationError('Cache max size must be greater than 0');
    }
  }
}

/**
 * 验证应用配置
 * @param {AppConfig} config - 应用配置对象
 * @throws {ConfigValidationError} 当应用配置无效时抛出
 */
export function validateAppConfig(config: AppConfig): void {
  // 验证应用名称
  if (!config.name) {
    throw new ConfigValidationError('App name is required');
  }

  // 验证环境设置
  if (!['development', 'test', 'production'].includes(config.env)) {
    throw new ConfigValidationError('Invalid environment setting');
  }

  // 验证版本号
  if (!config.version) {
    throw new ConfigValidationError('App version is required');
  }

  // 验证主题配置
  if (!['light', 'dark'].includes(config.theme.default)) {
    throw new ConfigValidationError('Invalid theme setting');
  }
}

/**
 * 验证所有配置
 * @throws {ConfigValidationError} 当任何配置无效时抛出
 */
export function validateAllConfigs(): void {
  try {
    // 验证环境变量
    validateEnvVars();

    // 验证API配置
    const apiConfig = require('@/config/api').default;
    validateApiConfig(apiConfig);

    // 验证应用配置
    const appConfig = require('@/config/app').default;
    validateAppConfig(appConfig);

    console.log('✅ All configurations validated successfully');
  } catch (error) {
    if (error instanceof ConfigValidationError) {
      console.error('❌ Configuration validation failed:', error.message);
      throw error;
    }
    throw error;
  }
}

export default {
  validateEnvVars,
  validateApiConfig,
  validateAppConfig,
  validateAllConfigs,
  ConfigValidationError
};
