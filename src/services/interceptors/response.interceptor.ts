import { http } from '../http';

export const setupResponseInterceptors = () => {
  http.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      // 在这里处理错误响应
      if (error.response?.status === 401) {
        // 处理未授权
      }
      return Promise.reject(error);
    }
  );
};