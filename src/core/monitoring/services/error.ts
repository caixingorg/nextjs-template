import { MONITORING_CONFIG } from '../config/monitoring.config';
import { logger } from '../../logger/config/logger.config';
import { AppError } from '../../error/error';

class ErrorMonitor {
  private isInitialized = false;

  initialize() {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    this.setupErrorHandlers();
    this.setupUnhandledRejection();
    this.setupConsoleError();

    this.isInitialized = true;
  }

  private setupErrorHandlers() {
    if (!MONITORING_CONFIG.error.unhandledError) return;

    window.addEventListener('error', (event) => {
      if (Math.random() > MONITORING_CONFIG.error.sampleRate) return;

      const error = event.error;
      
      logger.error('Unhandled Error:', {
        message: error.message,
        stack: error.stack,
        type: error instanceof AppError ? error.name : 'Error',
        location: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });
  }

  private setupUnhandledRejection() {
    if (!MONITORING_CONFIG.error.unhandledPromise) return;

    window.addEventListener('unhandledrejection', (event) => {
      if (Math.random() > MONITORING_CONFIG.error.sampleRate) return;

      const error = event.reason;
      
      logger.error('Unhandled Promise Rejection:', {
        message: error.message || String(error),
        stack: error.stack,
        type: error instanceof AppError ? error.name : 'UnhandledRejection',
      });
    });
  }

  private setupConsoleError() {
    if (!MONITORING_CONFIG.error.consoleError) return;

    const originalConsoleError = console.error;
    
    console.error = (...args: any[]) => {
      if (Math.random() <= MONITORING_CONFIG.error.sampleRate) {
        logger.error('Console Error:', {
          arguments: args.map(arg => 
            arg instanceof Error ? {
              message: arg.message,
              stack: arg.stack,
              type: arg instanceof AppError ? arg.name : 'Error',
            } : arg
          ),
        });
      }
      
      originalConsoleError.apply(console, args);
    };
  }

  // 手动记录错误
  logError(error: Error, context: Record<string, any> = {}) {
    if (Math.random() > MONITORING_CONFIG.error.sampleRate) return;

    logger.error('Manual Error Log:', {
      error: error instanceof AppError ? error.toJSON() : {
        message: error.message,
        stack: error.stack,
        type: error.name,
      },
      context,
    });
  }
}

export const errorMonitor = new ErrorMonitor();
