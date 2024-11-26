/**
 * API配置文件
 * @description 定义API相关的配置项，包括基础URL、超时时间、重试策略等
 * @module config/api
 */

import { ENV_DEFAULTS } from './env';
import { isDevelopment } from './app';

/**
 * API响应码
 */
export enum ApiResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

/**
 * API错误类型
 */
export enum ApiErrorType {
  NETWORK = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT_ERROR',
  AUTH = 'AUTH_ERROR',
  BUSINESS = 'BUSINESS_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  SERVER = 'SERVER_ERROR',
}

/**
 * API配置接口
 * @interface ApiConfig
 */
export interface ApiConfig {
  /** 基础URL */
  baseURL: string;
  /** API版本 */
  version: string;
  /** 超时时间（毫秒） */
  timeout: number;
  /** 请求头配置 */
  headers: {
    /** 内容类型 */
    contentType: string;
    /** 接受类型 */
    accept: string;
  };
  /** 重试配置 */
  retry: {
    /** 最大重试次数 */
    maxRetries: number;
    /** 重试延迟（毫秒） */
    delay: number;
    /** 需要重试的状态码 */
    statusCodes: number[];
  };
  /** 缓存配置 */
  cache: {
    /** 是否启用缓存 */
    enabled: boolean;
    /** 缓存时间（秒） */
    ttl: number;
    /** 缓存大小限制（条） */
    maxSize: number;
  };
  /** 错误处理配置 */
  errorHandling: {
    /** 是否显示错误通知 */
    showNotification: boolean;
    /** 是否记录错误日志 */
    logError: boolean;
  };
}

/**
 * 默认API配置
 * @description 基于环境变量和默认值构建API配置
 */
export const apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  version: process.env.NEXT_PUBLIC_API_VERSION || ENV_DEFAULTS.NEXT_PUBLIC_API_VERSION,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT || ENV_DEFAULTS.NEXT_PUBLIC_API_TIMEOUT),
  headers: {
    contentType: 'application/json',
    accept: 'application/json',
  },
  retry: {
    maxRetries: 3,
    delay: 1000,
    statusCodes: [408, 500, 502, 503, 504],
  },
  cache: {
    enabled: !isDevelopment(),
    ttl: 300, // 5分钟
    maxSize: 100,
  },
  errorHandling: {
    showNotification: true,
    logError: true,
  },
};

/**
 * API路由配置
 */
export const API_ROUTES = {
  USER: {
    PROFILE: '/api/user/profile',
    SETTINGS: '/api/user/settings',
  },
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: (id: string) => `/api/products/${id}`,
  },
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders',
    DETAIL: (id: string) => `/api/orders/${id}`,
  },
} as const;

/**
 * API错误码
 */
export enum ApiErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * 获取完整的API URL
 * @param {string} path - API路径
 * @returns {string} 完整的API URL
 */
export function getApiUrl(path: string): string {
  return `${apiConfig.baseURL}/api/${apiConfig.version}${path}`;
}

/**
 * 获取API配置
 * @returns {ApiConfig} API配置对象
 */
export function getApiConfig(): ApiConfig {
  return apiConfig;
}

export default apiConfig;
