import { createLogger, format, transports } from 'winston';
import { LoggerOptions } from 'winston';

const { combine, timestamp, printf, colorize, errors } = format;

// 自定义日志格式
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  
  if (Object.keys(metadata).length > 0) {
    msg += `\n${JSON.stringify(metadata, null, 2)}`;
  }
  
  return msg;
});

// 开发环境配置
const developmentConfig: LoggerOptions = {
  level: 'debug',
  format: combine(
    colorize(),
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console(),
  ],
};

// 生产环境配置
const productionConfig: LoggerOptions = {
  level: 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: format.uncolorize(),
    }),
    // 可以添加其他传输方式，如文件或远程日志服务
  ],
};

// 根据环境选择配置
export const loggerConfig = process.env.NODE_ENV === 'production'
  ? productionConfig
  : developmentConfig;

// 创建日志实例
export const logger = createLogger(loggerConfig);

// 在开发环境下，也输出到控制台
if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logger initialized in development mode');
}

// 导出日志级别类型
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';
