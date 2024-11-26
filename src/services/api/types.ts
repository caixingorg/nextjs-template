/**
 * API响应基础接口
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应数据
 */
export interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 认证相关接口
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterParams {
  username: string;
  password: string;
  email: string;
}

/**
 * 用户相关接口
 */
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileParams {
  username?: string;
  email?: string;
  avatar?: string;
}
