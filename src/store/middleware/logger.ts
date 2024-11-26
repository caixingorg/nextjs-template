/**
 * 状态管理中间件 - 日志
 * @description 用于记录状态变更的日志中间件
 * @module store/middleware/logger
 */

import { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { isDevelopment } from '@/config/app';

type Logger = <
  T extends unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends unknown>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

/**
 * 状态变更日志中间件
 * @param config - 中间件配置
 */
const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  type T = ReturnType<typeof f>;

  if (!isDevelopment()) {
    return f(set, get, store);
  }

  const loggedSet: typeof set = (...args) => {
    const prevState = get();
    set(...args);
    const nextState = get();

    // 计算变更的状态
    const changes = Object.entries(nextState).reduce((acc, [key, value]) => {
      if (prevState[key as keyof T] !== value) {
        acc[key] = {
          from: prevState[key as keyof T],
          to: value,
        };
      }
      return acc;
    }, {} as Record<string, { from: any; to: any }>);

    // 打印状态变更日志
    if (Object.keys(changes).length > 0) {
      console.group(
        `%c${name || 'Store'} %cState Update ${new Date().toLocaleTimeString()}`,
        'color: #3f51b5; font-weight: bold;',
        'color: #9e9e9e; font-weight: normal;'
      );
      console.log('Prev:', prevState);
      console.log('Next:', nextState);
      console.log('Changes:', changes);
      console.groupEnd();
    }
  };

  return f(loggedSet, get, store);
};

/**
 * 状态变更日志中间件
 */
export const logger = loggerImpl as unknown as Logger;
