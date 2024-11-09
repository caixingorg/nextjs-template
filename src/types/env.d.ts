/**
 * Path: src/types/env.d.ts
 * Purpose: Environment variables type definitions
 */

declare namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
      NEXT_PUBLIC_APP_URL: string
      // 添加其他环境变量
    }
  }