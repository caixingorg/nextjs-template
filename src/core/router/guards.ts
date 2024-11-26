import { RouteGuard, RouteGuardContext } from './types';

/**
 * 权限守卫
 * @description 检查用户是否有访问权限
 */
export const permissionGuard: RouteGuard = async (context: RouteGuardContext) => {
  const { meta, permissions } = context;

  // 如果路由需要特定权限
  if (meta?.permissions?.length) {
    // 检查用户是否有所需的所有权限
    const hasPermission = meta.permissions.some(permission =>
      permissions?.includes(permission)
    );

    if (!hasPermission) {
      throw new Error('没有访问权限');
    }
  }

  return true;
};

/**
 * 组合多个守卫
 * @description 按顺序执行多个守卫
 */
export const composeGuards = (...guards: RouteGuard[]): RouteGuard => {
  return async (context: RouteGuardContext) => {
    for (const guard of guards) {
      const result = await guard(context);
      
      // 如果返回字符串，表示需要重定向
      if (typeof result === 'string') {
        return result;
      }
      
      // 如果返回false，表示不允许访问
      if (!result) {
        return false;
      }
    }
    
    return true;
  };
};

/**
 * 默认守卫
 * @description 组合认证、权限和重定向守卫
 */
export const guards: RouteGuard[] = [
  permissionGuard,
];
