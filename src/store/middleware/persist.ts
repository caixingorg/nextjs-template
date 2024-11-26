/**
 * 状态管理中间件 - 持久化
 * @description 用于状态持久化的中间件
 * @module store/middleware/persist
 */

import { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { persist as zustandPersist } from 'zustand/middleware';

type Persist = <
  T extends unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  options: {
    name: string;
    version?: number;
    whitelist?: (keyof T)[];
    blacklist?: (keyof T)[];
  }
) => StateCreator<T, Mps, Mcs>;

type PersistImpl = <T extends unknown>(
  f: StateCreator<T, [], []>,
  options: {
    name: string;
    version?: number;
    whitelist?: (keyof T)[];
    blacklist?: (keyof T)[];
  }
) => StateCreator<T, [], []>;

/**
 * 状态持久化中间件
 * @param config - 中间件配置
 */
const persistImpl: PersistImpl = (f, options) => {
  const { name, version = 1, whitelist, blacklist } = options;

  return zustandPersist(f, {
    name,
    version,
    partialize: (state) => {
      if (whitelist) {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => whitelist.includes(key as keyof typeof state))
        );
      }
      if (blacklist) {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => !blacklist.includes(key as keyof typeof state))
        );
      }
      return state;
    },
  });
};

/**
 * 状态持久化中间件
 */
export const persist = persistImpl as unknown as Persist;
