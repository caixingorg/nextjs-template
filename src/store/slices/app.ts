/**
 * 应用状态切片
 * @description 管理应用级别的状态
 * @module store/slices/app
 */

import { StateCreator } from 'zustand';

export interface AppState {
  // 主题
  theme: 'light' | 'dark';
  // 语言
  locale: string;
  // 加载状态
  loading: boolean;
  // 全局错误
  error: string | null;
  // 操作
  setTheme: (theme: AppState['theme']) => void;
  setLocale: (locale: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const createAppSlice: StateCreator<AppState> = (set) => ({
  // 初始状态
  theme: 'light',
  locale: 'en',
  loading: false,
  error: null,

  // 操作
  setTheme: (theme) => set({ theme }),
  setLocale: (locale) => set({ locale }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
});
