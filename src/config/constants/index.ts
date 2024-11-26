/**
 * 全局常量定义
 */

// API 相关
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
export const API_TIMEOUT = 10000;

// 分页相关
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// 本地存储 key
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  THEME: 'theme',
  LOCALE: 'locale',
} as const;

// 主题
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// 语言
export const LOCALES = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
} as const;

// 路由
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

// 响应码
export const RESPONSE_CODE = {
  SUCCESS: 0,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

// 错误码
export const ERROR_CODE = {
  SYSTEM_ERROR: 10000,
  NETWORK_ERROR: 10001,
  AUTH_ERROR: 20000,
  PARAMS_ERROR: 30000,
  BUSINESS_ERROR: 40000,
} as const;
