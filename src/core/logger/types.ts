/**
 * 日志级别枚举
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

/**
 * 日志元数据接口
 */
export interface LogMetadata {
  timestamp: string;
  level: LogLevel;
  module?: string;
  context?: Record<string, any>;
  tags?: string[];
}

/**
 * 日志记录接口
 */
export interface LogEntry extends LogMetadata {
  message: string;
  error?: Error;
  stack?: string;
}

/**
 * 日志格式化器接口
 */
export interface LogFormatter {
  format(entry: LogEntry): string;
}

/**
 * 日志传输器接口
 */
export interface LogTransport {
  log(entry: LogEntry): Promise<void>;
}

/**
 * 日志配置接口
 */
export interface LoggerConfig {
  level: LogLevel;
  module?: string;
  formatter?: LogFormatter;
  transports?: LogTransport[];
  metadata?: Partial<LogMetadata>;
}

/**
 * 日志性能指标接口
 */
export interface LoggerMetrics {
  totalLogs: number;
  errorCount: number;
  warningCount: number;
  averageResponseTime: number;
  lastLogTimestamp?: string;
}

/**
 * 日志查询选项
 */
export interface LogQueryOptions {
  level?: LogLevel;
  module?: string;
  startTime?: Date;
  endTime?: Date;
  tags?: string[];
  limit?: number;
  offset?: number;
}
