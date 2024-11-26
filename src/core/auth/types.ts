/**
 * 权限类型
 */
export type Permission = string;

/**
 * 角色类型
 */
export type Role = string;

/**
 * 用户类型
 */
export interface User {
  id: string;
  username: string;
  email?: string;
  roles: Role[];
  permissions: Permission[];
}

/**
 * 权限检查类型
 */
export type PermissionCheck = Permission | Permission[] | ((permissions: Permission[]) => boolean);

/**
 * 角色检查类型
 */
export type RoleCheck = Role | Role[] | ((roles: Role[]) => boolean);

/**
 * 认证状态
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  error: Error | null;
}

/**
 * 权限配置
 */
export interface PermissionConfig {
  /**
   * 超级管理员角色
   */
  superAdminRole?: Role;

  /**
   * 默认角色
   */
  defaultRole?: Role;

  /**
   * 角色权限映射
   */
  rolePermissions?: Record<Role, Permission[]>;

  /**
   * 权限层级
   */
  permissionHierarchy?: Record<Permission, Permission[]>;
}

/**
 * 权限验证结果
 */
export interface PermissionValidation {
  hasPermission: boolean;
  missingPermissions: Permission[];
  grantedPermissions: Permission[];
}

/**
 * 角色验证结果
 */
export interface RoleValidation {
  hasRole: boolean;
  missingRoles: Role[];
  grantedRoles: Role[];
}
