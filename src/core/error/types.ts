/**
 * 错误类型定义
 * @description 定义应用中的错误类型和错误码
 * @module errors/types
 */

/**
 * 错误码枚举
 */
export enum ErrorCode {
  // 系统错误 (1000-1999)
  UNKNOWN = 'ERR_1000',              // 未知错误
  TIMEOUT = 'ERR_1001',              // 超时错误
  CANCELED = 'ERR_1002',             // 取消操作
  NETWORK = 'ERR_1003',              // 网络错误
  SERVER = 'ERR_1004',               // 服务器错误
  
  // 认证错误 (2000-2999)
  UNAUTHORIZED = 'ERR_2000',         // 未认证
  TOKEN_EXPIRED = 'ERR_2001',        // Token过期
  TOKEN_INVALID = 'ERR_2002',        // Token无效
  PERMISSION_DENIED = 'ERR_2003',    // 权限不足
  
  // 请求错误 (3000-3999)
  BAD_REQUEST = 'ERR_3000',          // 错误的请求
  NOT_FOUND = 'ERR_3001',            // 资源不存在
  METHOD_NOT_ALLOWED = 'ERR_3002',   // 方法不允许
  CONFLICT = 'ERR_3003',             // 资源冲突
  
  // 数据错误 (4000-4999)
  VALIDATION = 'ERR_4000',           // 数据验证错误
  PARSE = 'ERR_4001',                // 数据解析错误
  TYPE = 'ERR_4002',                 // 类型错误
  FORMAT = 'ERR_4003',               // 格式错误
  
  // 业务错误 (5000-5999)
  BUSINESS = 'ERR_5000',             // 通用业务错误
  RESOURCE_EXISTS = 'ERR_5001',      // 资源已存在
  RESOURCE_NOT_FOUND = 'ERR_5002',   // 资源不存在
  OPERATION_FAILED = 'ERR_5003',     // 操作失败
}

/**
 * 错误级别枚举
 */
export enum ErrorLevel {
  INFO = 'info',         // 信息
  WARNING = 'warning',   // 警告
  ERROR = 'error',       // 错误
  FATAL = 'fatal',       // 致命错误
}

/**
 * 错误类型
 */
export interface ErrorType {
  code: ErrorCode;       // 错误码
  message: string;       // 错误信息
  level: ErrorLevel;     // 错误级别
  timestamp: number;     // 错误发生时间
  data?: any;           // 错误相关数据
  stack?: string;       // 错误堆栈
  cause?: Error;        // 原始错误
}

/**
 * 错误配置
 */
export interface ErrorOptions {
  code?: ErrorCode;      // 错误码
  message?: string;      // 错误信息
  level?: ErrorLevel;    // 错误级别
  data?: any;           // 错误相关数据
  cause?: Error;        // 原始错误
}
