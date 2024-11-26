import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

// Axios 实例配置
export const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// 创建 Axios 实例
export const axiosInstance = axios.create(axiosConfig);

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 从 NextAuth session 获取 token
    // const session = await getSession();
    // if (session?.accessToken) {
    //   config.headers.Authorization = `Bearer ${session.accessToken}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 处理认证错误
    }
    return Promise.reject(error);
  }
);

// React Query 客户端配置
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
