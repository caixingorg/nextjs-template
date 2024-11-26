import {
  Permission,
  Role,
  PermissionCheck,
  RoleCheck,
  PermissionConfig,
  PermissionValidation,
  RoleValidation
} from './types';

import { getServerSession } from 'next-auth';
import { authConfig } from './config/auth.config';
import { redirect } from 'next/navigation';

/**
 * 默认权限配置
 */
const defaultConfig: PermissionConfig = {
  superAdminRole: 'admin',
  defaultRole: 'user',
  rolePermissions: {
    admin: ['*'],
    user: ['read']
  },
  permissionHierarchy: {
    'write': ['read'],
    'admin': ['write', 'read']
  }
};

/**
 * 权限检查工具
 */
export class PermissionChecker {
  private config: PermissionConfig;

  constructor(config: Partial<PermissionConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * 检查权限
   */
  checkPermission(
    userPermissions: Permission[],
    check: PermissionCheck
  ): PermissionValidation {
    // 检查是否是函数
    if (typeof check === 'function') {
      const hasPermission = check(userPermissions);
      return {
        hasPermission,
        missingPermissions: [],
        grantedPermissions: hasPermission ? userPermissions : []
      };
    }

    // 转换为数组
    const requiredPermissions = Array.isArray(check) ? check : [check];
    
    // 展开权限层级
    const expandedPermissions = this.expandPermissions(requiredPermissions);
    
    // 检查权限
    const grantedPermissions = expandedPermissions.filter(permission =>
      this.hasPermission(userPermissions, permission)
    );
    
    const missingPermissions = expandedPermissions.filter(
      permission => !grantedPermissions.includes(permission)
    );

    return {
      hasPermission: missingPermissions.length === 0,
      missingPermissions,
      grantedPermissions
    };
  }

  /**
   * 检查角色
   */
  checkRole(
    userRoles: Role[],
    check: RoleCheck
  ): RoleValidation {
    // 检查是否是函数
    if (typeof check === 'function') {
      const hasRole = check(userRoles);
      return {
        hasRole,
        missingRoles: [],
        grantedRoles: hasRole ? userRoles : []
      };
    }

    // 转换为数组
    const requiredRoles = Array.isArray(check) ? check : [check];
    
    // 检查是否有超级管理员角色
    if (
      this.config.superAdminRole &&
      userRoles.includes(this.config.superAdminRole)
    ) {
      return {
        hasRole: true,
        missingRoles: [],
        grantedRoles: requiredRoles
      };
    }

    // 检查角色
    const grantedRoles = requiredRoles.filter(role =>
      userRoles.includes(role)
    );
    
    const missingRoles = requiredRoles.filter(
      role => !grantedRoles.includes(role)
    );

    return {
      hasRole: missingRoles.length === 0,
      missingRoles,
      grantedRoles
    };
  }

  /**
   * 展开权限层级
   */
  private expandPermissions(permissions: Permission[]): Permission[] {
    const expanded = new Set<Permission>();

    const expand = (permission: Permission) => {
      expanded.add(permission);
      
      // 添加层级权限
      const hierarchyPermissions = this.config.permissionHierarchy?.[permission];
      if (hierarchyPermissions) {
        hierarchyPermissions.forEach(p => expand(p));
      }
    };

    permissions.forEach(expand);
    return Array.from(expanded);
  }

  /**
   * 检查单个权限
   */
  private hasPermission(
    userPermissions: Permission[],
    permission: Permission
  ): boolean {
    // 通配符检查
    if (userPermissions.includes('*')) {
      return true;
    }

    // 直接匹配
    if (userPermissions.includes(permission)) {
      return true;
    }

    // 前缀匹配（例如：admin.* 匹配 admin.users）
    if (permission.includes('.')) {
      const wildcardPermissions = userPermissions.filter(p => p.endsWith('.*'));
      return wildcardPermissions.some(p => {
        const prefix = p.slice(0, -2); // 移除 .*
        return permission.startsWith(prefix);
      });
    }

    return false;
  }

  /**
   * 获取角色的权限
   */
  getRolePermissions(role: Role): Permission[] {
    return this.config.rolePermissions?.[role] || [];
  }

  /**
   * 合并用户的所有权限
   */
  mergePermissions(roles: Role[], permissions: Permission[]): Permission[] {
    const rolePermissions = roles.flatMap(role => this.getRolePermissions(role));
    return [...new Set([...rolePermissions, ...permissions])];
  }
}

export async function getSession() {
  return await getServerSession(authConfig);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return session;
}

export async function checkRole(roles: string[]) {
  const session = await getSession();
  
  if (!session?.user?.role) {
    return false;
  }
  
  return roles.includes(session.user.role);
}

export async function requireRole(roles: string[]) {
  const session = await getSession();
  
  if (!session?.user?.role) {
    redirect('/auth/signin');
  }
  
  if (!roles.includes(session.user.role)) {
    redirect('/403');
  }
  
  return session;
}
