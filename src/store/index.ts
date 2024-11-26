/**
 * 状态管理
 * @description 统一的状态管理入口
 * @module store
 */

import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { logger } from './middleware/logger';
import { persist } from './middleware/persist';
import { AppState, createAppSlice } from './slices/app';

// 合并状态类型
export interface RootState extends AppState {}

type RootSlice = StateCreator<RootState>;

const createRootSlice: RootSlice = (...args) => ({
  ...createAppSlice(...args),
});

// 创建状态存储
export const useStore = create<RootState>()(
  logger(
    persist(
      devtools(
        (...args) => ({
          ...createRootSlice(...args),
        }),
        { name: 'app-storage' }
      ),
      {
        name: 'app-storage',
        version: 1,
        whitelist: ['theme', 'locale'],
      }
    ),
    'AppStore'
  )
);

// 导出状态选择器
export const useAppState = () => useStore((state) => ({
  theme: state.theme,
  locale: state.locale,
  loading: state.loading,
  error: state.error,
  setTheme: state.setTheme,
  setLocale: state.setLocale,
  setLoading: state.setLoading,
  setError: state.setError,
}));

export default useStore;
