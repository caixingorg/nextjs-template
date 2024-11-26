import React from 'react';
import { usePermission } from './hooks';
import { PermissionCheck, RoleCheck } from './types';

/**
 * 权限检查组件属性
 */
interface PermissionGuardProps {
  permission: PermissionCheck;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 角色检查组件属性
 */
interface RoleGuardProps {
  role: RoleCheck;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 权限检查组件
 * @description 根据权限条件渲染内容
 */
export function PermissionGuard({
  permission,
  children,
  fallback = null
}: PermissionGuardProps) {
  const { checkPermission } = usePermission();
  const { hasPermission } = checkPermission(permission);

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}

/**
 * 角色检查组件
 * @description 根据角色条件渲染内容
 */
export function RoleGuard({
  role,
  children,
  fallback = null
}: RoleGuardProps) {
  const { checkRole } = usePermission();
  const { hasRole } = checkRole(role);

  return hasRole ? <>{children}</> : <>{fallback}</>;
}

/**
 * 权限检查高阶组件
 * @description 包装组件以添加权限检查
 */
export function withPermission(
  WrappedComponent: React.ComponentType<any>,
  permission: PermissionCheck,
  fallback: React.ReactNode = null
) {
  return function WithPermissionComponent(props: any) {
    return (
      <PermissionGuard permission={permission} fallback={fallback}>
        <WrappedComponent {...props} />
      </PermissionGuard>
    );
  };
}

/**
 * 角色检查高阶组件
 * @description 包装组件以添加角色检查
 */
export function withRole(
  WrappedComponent: React.ComponentType<any>,
  role: RoleCheck,
  fallback: React.ReactNode = null
) {
  return function WithRoleComponent(props: any) {
    return (
      <RoleGuard role={role} fallback={fallback}>
        <WrappedComponent {...props} />
      </RoleGuard>
    );
  };
}

/**
 * 认证检查组件属性
 */
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 认证检查组件
 * @description 检查用户是否已认证
 */
export function AuthGuard({
  children,
  fallback = <div>请先登录</div>
}: AuthGuardProps) {
  const { checkPermission } = usePermission();
  const { hasPermission } = checkPermission('authenticated');

  return hasPermission ? <>{children}</> : <>{fallback}</>;
}

/**
 * 认证检查高阶组件
 * @description 包装组件以添加认证检查
 */
export function withAuth(
  WrappedComponent: React.ComponentType<any>,
  fallback: React.ReactNode = <div>请先登录</div>
) {
  return function WithAuthComponent(props: any) {
    return (
      <AuthGuard fallback={fallback}>
        <WrappedComponent {...props} />
      </AuthGuard>
    );
  };
}
