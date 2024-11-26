import { useCallback } from 'react';
import { logger } from '../config/logger.config';
import type { LogLevel } from '../config/logger.config';

interface LogOptions {
  context?: Record<string, unknown>;
  error?: Error;
}

export function useLogger(defaultContext: Record<string, unknown> = {}) {
  const log = useCallback((level: LogLevel, message: string, options: LogOptions = {}) => {
    const { context = {}, error } = options;
    const logData = {
      ...defaultContext,
      ...context,
      ...(error && { error: error instanceof Error ? error.stack : error }),
    };

    logger.log(level, message, logData);
  }, [defaultContext]);

  return {
    error: useCallback((message: string, options?: LogOptions) => {
      log('error', message, options);
    }, [log]),

    warn: useCallback((message: string, options?: LogOptions) => {
      log('warn', message, options);
    }, [log]),

    info: useCallback((message: string, options?: LogOptions) => {
      log('info', message, options);
    }, [log]),

    debug: useCallback((message: string, options?: LogOptions) => {
      log('debug', message, options);
    }, [log]),
  };
}
