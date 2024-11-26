import { BaseError } from './base.error';

/**
 * 路由错误类
 */
export class RouterError extends BaseError {
  constructor(message: string, cause?: Error) {
    super('RouterError', message, cause);
  }
}
