/**
 * 环境变量类型定义文件
 * @description 定义所有环境变量的类型，确保类型安全
 * @module config/env
 */

/**
 * 环境变量类型定义
 * @interface ProcessEnv
 * @extends NodeJS.ProcessEnv
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // 应用基础配置
      /** 应用名称 */
      NEXT_PUBLIC_APP_NAME: string;
      /** 应用环境：development | test | production */
      NEXT_PUBLIC_APP_ENV: 'development' | 'test' | 'production';
      /** 应用版本号 */
      NEXT_PUBLIC_APP_VERSION: string;
      /** 应用描述 */
      NEXT_PUBLIC_APP_DESCRIPTION: string;

      // API配置
      /** API基础URL */
      NEXT_PUBLIC_API_BASE_URL: string;
      /** API版本 */
      NEXT_PUBLIC_API_VERSION: string;
      /** API超时时间（毫秒） */
      NEXT_PUBLIC_API_TIMEOUT: string;

      // 认证配置
      /** JWT密钥 */
      JWT_SECRET: string;
      /** JWT过期时间 */
      JWT_EXPIRES_IN: string;
      /** 刷新令牌过期时间 */
      REFRESH_TOKEN_EXPIRES_IN: string;

      // 存储配置
      /** 存储前缀 */
      NEXT_PUBLIC_STORAGE_PREFIX: string;
      /** 存储加密密钥 */
      STORAGE_ENCRYPT_KEY: string;

      // 日志配置
      /** 日志级别：debug | info | warn | error */
      NEXT_PUBLIC_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
      /** 是否启用日志 */
      NEXT_PUBLIC_LOG_ENABLED: string;

      // 主题配置
      /** 默认主题：light | dark */
      NEXT_PUBLIC_DEFAULT_THEME: 'light' | 'dark';
      /** 是否允许切换主题 */
      NEXT_PUBLIC_THEME_SWITCHING: string;

      // 国际化配置
      /** 默认语言 */
      NEXT_PUBLIC_DEFAULT_LOCALE: string;
      /** 支持的语言列表（逗号分隔） */
      NEXT_PUBLIC_SUPPORTED_LOCALES: string;
    }
  }
}

/**
 * 环境变量默认值
 * @description 为可选的环境变量提供默认值
 */
export const ENV_DEFAULTS = {
  // 应用基础配置
  NEXT_PUBLIC_APP_NAME: 'Next.js Template',
  NEXT_PUBLIC_APP_ENV: 'development',
  NEXT_PUBLIC_APP_VERSION: '1.0.0',
  NEXT_PUBLIC_APP_DESCRIPTION: 'A Next.js template for rapid development',

  // API配置
  NEXT_PUBLIC_API_VERSION: 'v1',
  NEXT_PUBLIC_API_TIMEOUT: '10000',

  // 存储配置
  NEXT_PUBLIC_STORAGE_PREFIX: 'app_',

  // 日志配置
  NEXT_PUBLIC_LOG_LEVEL: 'info',
  NEXT_PUBLIC_LOG_ENABLED: 'true',

  // 主题配置
  NEXT_PUBLIC_DEFAULT_THEME: 'light',
  NEXT_PUBLIC_THEME_SWITCHING: 'true',

  // 国际化配置
  NEXT_PUBLIC_DEFAULT_LOCALE: 'zh',
  NEXT_PUBLIC_SUPPORTED_LOCALES: 'zh,en'
} as const;

/**
 * 环境变量验证规则
 * @description 定义必需的环境变量和其验证规则
 */
export const ENV_VALIDATIONS = {
  required: [
    'NEXT_PUBLIC_API_BASE_URL',
    'JWT_SECRET',
    'STORAGE_ENCRYPT_KEY'
  ],
  pattern: {
    NEXT_PUBLIC_APP_ENV: /^(development|test|production)$/,
    NEXT_PUBLIC_LOG_LEVEL: /^(debug|info|warn|error)$/,
    NEXT_PUBLIC_DEFAULT_THEME: /^(light|dark)$/
  }
} as const;

export default { ENV_DEFAULTS, ENV_VALIDATIONS };
