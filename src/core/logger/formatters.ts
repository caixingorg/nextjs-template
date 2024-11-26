import { LogEntry, LogFormatter } from './types';

/**
 * 简单日志格式化器
 */
export class SimpleFormatter implements LogFormatter {
  format(entry: LogEntry): string {
    const { timestamp, level, module, message } = entry;
    return `[${timestamp}] ${level.toUpperCase()} ${module ? `[${module}] ` : ''}${message}`;
  }
}

/**
 * JSON日志格式化器
 */
export class JsonFormatter implements LogFormatter {
  format(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
}

/**
 * 开发环境日志格式化器
 */
export class DevFormatter implements LogFormatter {
  format(entry: LogEntry): string {
    const { timestamp, level, module, message, context, tags } = entry;
    let output = `[${timestamp}] ${level.toUpperCase()}`;
    
    if (module) {
      output += ` [${module}]`;
    }
    
    output += ` ${message}`;
    
    if (context && Object.keys(context).length > 0) {
      output += `\nContext: ${JSON.stringify(context, null, 2)}`;
    }
    
    if (tags && tags.length > 0) {
      output += `\nTags: ${tags.join(', ')}`;
    }
    
    if (entry.error) {
      output += `\nError: ${entry.error.message}`;
      if (entry.stack) {
        output += `\nStack: ${entry.stack}`;
      }
    }
    
    return output;
  }
}

/**
 * 生产环境日志格式化器
 */
export class ProdFormatter implements LogFormatter {
  format(entry: LogEntry): string {
    const { timestamp, level, module, message, error } = entry;
    const base = {
      timestamp,
      level,
      module,
      message
    };

    if (error) {
      return JSON.stringify({
        ...base,
        error: {
          message: error.message,
          stack: error.stack
        }
      });
    }

    return JSON.stringify(base);
  }
}
