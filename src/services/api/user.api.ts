import { http } from '../http';
import { ApiResponse, UserProfile, UpdateProfileParams } from './types';
import { API_ROUTES } from '@/config/api';

/**
 * 用户服务
 */
export const UserApi = {
  /**
   * 获取当前用户信息
   */
  getCurrentUser: async (): Promise<ApiResponse<UserProfile>> => {
    const response = await http.get<ApiResponse<UserProfile>>(
      API_ROUTES.USER.PROFILE
    );
    return response.data;
  },

  /**
   * 更新用户信息
   */
  updateProfile: async (params: UpdateProfileParams): Promise<ApiResponse<UserProfile>> => {
    const response = await http.put<ApiResponse<UserProfile>>(
      API_ROUTES.USER.PROFILE,
      params
    );
    return response.data;
  },

  /**
   * 更新用户头像
   */
  updateAvatar: async (file: File): Promise<ApiResponse<{ avatar: string }>> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await http.put<ApiResponse<{ avatar: string }>>(
      API_ROUTES.USER.AVATAR,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * 修改密码
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    const response = await http.put<ApiResponse<void>>(
      API_ROUTES.USER.CHANGE_PASSWORD,
      { oldPassword, newPassword }
    );
    return response.data;
  },

  /**
   * 删除账户
   */
  deleteAccount: async (password: string): Promise<ApiResponse<void>> => {
    const response = await http.delete<ApiResponse<void>>(
      API_ROUTES.USER.DELETE_ACCOUNT,
      { data: { password } }
    );
    return response.data;
  }
};
