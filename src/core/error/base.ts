import { ErrorCode, ErrorLevel, ErrorType, ErrorOptions } from './types';

/**
 * 基础错误类
 * @description 所有自定义错误的基类
 * @extends Error
 */
export class BaseError extends Error implements ErrorType {
  readonly code: ErrorCode;
  readonly level: ErrorLevel;
  readonly timestamp: number;
  readonly data?: any;
  readonly cause?: Error;

  constructor(message: string, options: ErrorOptions = {}) {
    super(message);
    
    this.name = this.constructor.name;
    this.code = options.code || ErrorCode.UNKNOWN;
    this.level = options.level || ErrorLevel.ERROR;
    this.timestamp = Date.now();
    this.data = options.data;
    this.cause = options.cause;

    // 确保 instanceof 正常工作
    Object.setPrototypeOf(this, new.target.prototype);
    
    // 捕获堆栈信息
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * 获取错误详情
   */
  getDetails(): ErrorType {
    return {
      code: this.code,
      message: this.message,
      level: this.level,
      timestamp: this.timestamp,
      data: this.data,
      stack: this.stack,
      cause: this.cause
    };
  }

  /**
   * 转换为字符串
   */
  toString(): string {
    return `[${this.code}] ${this.message}`;
  }

  /**
   * 转换为JSON
   */
  toJSON(): ErrorType {
    return this.getDetails();
  }
}

/**
 * 系统错误
 */
export class SystemError extends BaseError {
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCode.UNKNOWN,
      level: options.level || ErrorLevel.ERROR
    });
  }
}

/**
 * 网络错误
 */
export class NetworkError extends BaseError {
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCode.NETWORK,
      level: options.level || ErrorLevel.ERROR
    });
  }
}

/**
 * 认证错误
 */
export class AuthError extends BaseError {
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCode.UNAUTHORIZED,
      level: options.level || ErrorLevel.WARNING
    });
  }
}

/**
 * 请求错误
 */
export class RequestError extends BaseError {
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCode.BAD_REQUEST,
      level: options.level || ErrorLevel.WARNING
    });
  }
}

/**
 * 验证错误
 */
export class ValidationError extends BaseError {
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCode.VALIDATION,
      level: options.level || ErrorLevel.WARNING
    });
  }
}

/**
 * 业务错误
 */
export class BusinessError extends BaseError {
  constructor(message: string, options: ErrorOptions = {}) {
    super(message, {
      ...options,
      code: options.code || ErrorCode.BUSINESS,
      level: options.level || ErrorLevel.WARNING
    });
  }
}
