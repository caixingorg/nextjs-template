import { useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AuthState,
  User,
  Permission,
  Role,
  PermissionCheck,
  RoleCheck
} from './types';
import { PermissionChecker } from './utils';

/**
 * 认证状态存储
 */
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
      error: null
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token
      })
    }
  )
);

/**
 * 权限检查器实例
 */
const permissionChecker = new PermissionChecker();

/**
 * 认证Hook
 */
export function useAuth() {
  const {
    isAuthenticated,
    isLoading,
    user,
    token,
    error
  } = useAuthStore();

  /**
   * 登录
   */
  const login = useCallback(async (
    credentials: { username: string; password: string }
  ) => {
    useAuthStore.setState({ isLoading: true, error: null });
    try {
      // TODO: 实现登录逻辑
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      
      useAuthStore.setState({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        isLoading: false
      });
    } catch (error) {
      useAuthStore.setState({
        isLoading: false,
        error: error as Error
      });
    }
  }, []);

  /**
   * 登出
   */
  const logout = useCallback(async () => {
    useAuthStore.setState({ isLoading: true });
    try {
      // TODO: 实现登出逻辑
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      useAuthStore.setState({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false
      });
    } catch (error) {
      useAuthStore.setState({
        isLoading: false,
        error: error as Error
      });
    }
  }, [token]);

  /**
   * 更新用户信息
   */
  const updateUser = useCallback((user: Partial<User>) => {
    useAuthStore.setState((state) => ({
      user: state.user ? { ...state.user, ...user } : null
    }));
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    token,
    error,
    login,
    logout,
    updateUser
  };
}

/**
 * 权限Hook
 */
export function usePermission() {
  const { user } = useAuth();

  /**
   * 检查权限
   */
  const checkPermission = useCallback(
    (check: PermissionCheck) => {
      if (!user) {
        return {
          hasPermission: false,
          missingPermissions: [],
          grantedPermissions: []
        };
      }

      return permissionChecker.checkPermission(user.permissions, check);
    },
    [user]
  );

  /**
   * 检查角色
   */
  const checkRole = useCallback(
    (check: RoleCheck) => {
      if (!user) {
        return {
          hasRole: false,
          missingRoles: [],
          grantedRoles: []
        };
      }

      return permissionChecker.checkRole(user.roles, check);
    },
    [user]
  );

  /**
   * 获取用户所有权限
   */
  const allPermissions = useMemo(() => {
    if (!user) {
      return [];
    }

    return permissionChecker.mergePermissions(user.roles, user.permissions);
  }, [user]);

  return {
    checkPermission,
    checkRole,
    allPermissions,
    roles: user?.roles || [],
    permissions: user?.permissions || []
  };
}
