import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT, ERROR_CODE, STORAGE_KEYS } from '@/config/constants';

/**
 * 请求配置
 */
interface RequestConfig extends AxiosRequestConfig {
  showError?: boolean;
  skipAuth?: boolean;
}

/**
 * 响应数据
 */
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

/**
 * HTTP 请求类
 */
class HttpRequest {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token && !(config as RequestConfig).skipAuth) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const { data } = response;
        if (data.code === 0) {
          return data.data;
        }
        
        // 处理特定错误码
        switch (data.code) {
          case ERROR_CODE.AUTH_ERROR:
            // 清除登录信息
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER_INFO);
            // 跳转到登录页
            window.location.href = '/login';
            break;
          default:
            if ((response.config as RequestConfig).showError !== false) {
              // 显示错误提示
              console.error(data.message);
            }
        }
        
        return Promise.reject(data);
      },
      (error) => {
        const config = error.config as RequestConfig;
        if (config?.showError !== false) {
          // 显示错误提示
          console.error(error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET 请求
   */
  public get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  /**
   * POST 请求
   */
  public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  /**
   * PUT 请求
   */
  public put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  /**
   * DELETE 请求
   */
  public delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }

  /**
   * PATCH 请求
   */
  public patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }
}

export const http = new HttpRequest();
