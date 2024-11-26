export * from './types';
export * from './formatters';
export * from './transports';
export * from './logger';

import { Logger } from './logger';
import { LogLevel } from './types';
import { DevFormatter, ProdFormatter } from './formatters';
import { ConsoleTransport, LocalStorageTransport } from './transports';

// 创建默认日志实例
const isDevelopment = process.env.NODE_ENV === 'development';

export const defaultLogger = new Logger({
  level: isDevelopment ? LogLevel.DEBUG : LogLevel.INFO,
  formatter: isDevelopment ? new DevFormatter() : new ProdFormatter(),
  transports: [
    new ConsoleTransport(),
    new LocalStorageTransport()
  ],
  metadata: {
    app: 'next-template',
    environment: process.env.NODE_ENV
  }
});
