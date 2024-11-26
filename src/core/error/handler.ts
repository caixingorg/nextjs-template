import { ErrorType, ErrorLevel } from './types';
import { BaseError } from './base';

/**
 * 错误处理器配置
 */
export interface ErrorHandlerConfig {
  /**
   * 是否显示错误通知
   */
  showNotification?: boolean;
  
  /**
   * 是否记录错误日志
   */
  logError?: boolean;
  
  /**
   * 是否上报错误
   */
  reportError?: boolean;
  
  /**
   * 自定义错误处理函数
   */
  onError?: (error: ErrorType) => void;
}

/**
 * 默认错误处理器配置
 */
const defaultConfig: ErrorHandlerConfig = {
  showNotification: true,
  logError: true,
  reportError: process.env.NODE_ENV === 'production',
};

/**
 * 错误处理器
 */
export class ErrorHandler {
  private config: ErrorHandlerConfig;

  constructor(config: ErrorHandlerConfig = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * 处理错误
   */
  handle(error: Error | BaseError | unknown): ErrorType {
    // 转换错误为标准格式
    const standardError = this.standardizeError(error);

    // 记录错误日志
    if (this.config.logError) {
      this.logError(standardError);
    }

    // 显示错误通知
    if (this.config.showNotification) {
      this.showNotification(standardError);
    }

    // 上报错误
    if (this.config.reportError) {
      this.reportError(standardError);
    }

    // 调用自定义错误处理函数
    if (this.config.onError) {
      this.config.onError(standardError);
    }

    return standardError;
  }

  /**
   * 标准化错误
   */
  private standardizeError(error: Error | BaseError | unknown): ErrorType {
    if (error instanceof BaseError) {
      return error.getDetails();
    }

    if (error instanceof Error) {
      return {
        code: 'ERR_1000',
        message: error.message,
        level: ErrorLevel.ERROR,
        timestamp: Date.now(),
        stack: error.stack,
      };
    }

    return {
      code: 'ERR_1000',
      message: String(error),
      level: ErrorLevel.ERROR,
      timestamp: Date.now(),
    };
  }

  /**
   * 记录错误日志
   */
  private logError(error: ErrorType): void {
    const { level } = error;

    switch (level) {
      case ErrorLevel.INFO:
        console.info(error);
        break;
      case ErrorLevel.WARNING:
        console.warn(error);
        break;
      case ErrorLevel.ERROR:
      case ErrorLevel.FATAL:
        console.error(error);
        break;
      default:
        console.log(error);
    }
  }

  /**
   * 显示错误通知
   */
  private showNotification(error: ErrorType): void {
    // TODO: 集成通知系统
    // 可以使用 toast 或 notification 组件
    console.log('[Notification]', error.message);
  }

  /**
   * 上报错误
   */
  private reportError(error: ErrorType): void {
    // TODO: 集成错误上报服务
    // 可以使用 Sentry 等服务
    if (process.env.NODE_ENV === 'production') {
      console.log('[Error Report]', error);
    }
  }
}
