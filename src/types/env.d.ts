declare namespace NodeJS {
  interface ProcessEnv {
    // 环境标识
    NODE_ENV: 'development' | 'test' | 'production';

    // 应用配置
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_ENV: 'dev' | 'test' | 'prod';
    NEXT_PUBLIC_APP_URL: string;

    // API配置
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_API_TIMEOUT: string;
    NEXT_PUBLIC_API_PREFIX: string;

    // 数据库配置
    DATABASE_URL: string;

    // 认证配置
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;

    // 日志配置
    NEXT_PUBLIC_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';

    // 其他配置
    NEXT_PUBLIC_UPLOAD_URL: string;
    NEXT_PUBLIC_STATIC_URL: string;
  }
}