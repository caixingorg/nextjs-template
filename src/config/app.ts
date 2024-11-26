/**
 * 应用配置文件
 * @description 定义应用级别的配置项，包括基础信息、功能开关等
 * @module config/app
 */

import { ENV_DEFAULTS } from './env';

/**
 * 应用环境类型
 */
export type AppEnvironment = 'development' | 'test' | 'production';

/**
 * 应用主题类型
 */
export type AppTheme = 'light' | 'dark';

/**
 * 应用配置接口
 * @interface AppConfig
 */
export interface AppConfig {
  /** 应用名称 */
  name: string;
  /** 应用环境 */
  env: AppEnvironment;
  /** 应用版本 */
  version: string;
  /** 应用描述 */
  description: string;
  /** 应用主题配置 */
  theme: {
    /** 默认主题 */
    default: AppTheme;
    /** 是否允许切换主题 */
    switchable: boolean;
  };
  /** 功能开关配置 */
  features: {
    /** 是否启用日志 */
    logging: boolean;
    /** 是否启用性能监控 */
    monitoring: boolean;
    /** 是否启用错误跟踪 */
    errorTracking: boolean;
    /** 是否启用用户行为分析 */
    analytics: boolean;
  };
  /** 安全配置 */
  security: {
    /** 是否启用内容安全策略 */
    csp: boolean;
    /** 是否启用XSS防护 */
    xssProtection: boolean;
    /** 是否启用点击劫持防护 */
    frameProtection: boolean;
  };
}

/**
 * 默认应用配置
 * @description 基于环境变量和默认值构建应用配置
 */
export const appConfig: AppConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || ENV_DEFAULTS.NEXT_PUBLIC_APP_NAME,
  env: (process.env.NEXT_PUBLIC_APP_ENV || ENV_DEFAULTS.NEXT_PUBLIC_APP_ENV) as AppEnvironment,
  version: process.env.NEXT_PUBLIC_APP_VERSION || ENV_DEFAULTS.NEXT_PUBLIC_APP_VERSION,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || ENV_DEFAULTS.NEXT_PUBLIC_APP_DESCRIPTION,
  theme: {
    default: (process.env.NEXT_PUBLIC_DEFAULT_THEME || ENV_DEFAULTS.NEXT_PUBLIC_DEFAULT_THEME) as AppTheme,
    switchable: process.env.NEXT_PUBLIC_THEME_SWITCHING === 'true'
  },
  features: {
    logging: process.env.NEXT_PUBLIC_LOG_ENABLED === 'true',
    monitoring: process.env.NODE_ENV === 'production',
    errorTracking: process.env.NODE_ENV === 'production',
    analytics: process.env.NODE_ENV === 'production'
  },
  security: {
    csp: true,
    xssProtection: true,
    frameProtection: true
  }
};

/**
 * 获取应用配置
 * @returns {AppConfig} 应用配置对象
 */
export function getAppConfig(): AppConfig {
  return appConfig;
}

/**
 * 判断是否为开发环境
 * @returns {boolean} 是否为开发环境
 */
export function isDevelopment(): boolean {
  return appConfig.env === 'development';
}

/**
 * 判断是否为测试环境
 * @returns {boolean} 是否为测试环境
 */
export function isTest(): boolean {
  return appConfig.env === 'test';
}

/**
 * 判断是否为生产环境
 * @returns {boolean} 是否为生产环境
 */
export function isProduction(): boolean {
  return appConfig.env === 'production';
}

export default appConfig;
