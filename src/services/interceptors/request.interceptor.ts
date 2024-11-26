import { http } from '../http';

export const setupRequestInterceptors = () => {
  http.interceptors.request.use(
    (config) => {
      // 在这里添加请求拦截逻辑，比如添加 token
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};