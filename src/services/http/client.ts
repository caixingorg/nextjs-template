/**
 * HTTP客户端
 * @description 基于Axios的HTTP请求客户端，包含请求拦截、响应拦截、错误处理等功能
 * @module services/http/client
 */

import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './config';

/**
 * HTTP请求错误
 */
export class HttpError extends Error {
  public code: string;
  public status?: number;
  public data?: any;

  constructor(message: string, code: string, status?: number, data?: any) {
    super(message);
    this.name = 'HttpError';
    this.code = code;
    this.status = status;
    this.data = data;
  }
}

class HttpClient {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return axiosInstance.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return axiosInstance.put<T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    return axiosInstance.delete<T>(url, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return axiosInstance.patch<T>(url, data, config);
  }
}

export const httpClient = new HttpClient();
export default httpClient;
