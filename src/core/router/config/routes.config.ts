export interface RouteConfig {
  path: string;
  roles?: string[];
  permissions?: string[];
  public?: boolean;
}

export const ROUTES = {
  // 公共路由
  public: {
    home: { path: '/', public: true },
    about: { path: '/about', public: true },
    contact: { path: '/contact', public: true },
  },

  // 认证相关路由
  auth: {
    login: { path: '/auth/login', public: true },
    register: { path: '/auth/register', public: true },
    forgotPassword: { path: '/auth/forgot-password', public: true },
    resetPassword: { path: '/auth/reset-password', public: true },
    verifyEmail: { path: '/auth/verify-email', public: true },
  },

  // 用户相关路由
  user: {
    profile: { path: '/user/profile', roles: ['user'] },
    settings: { path: '/user/settings', roles: ['user'] },
    dashboard: { path: '/user/dashboard', roles: ['user'] },
  },

  // 管理员路由
  admin: {
    dashboard: { path: '/admin/dashboard', roles: ['admin'] },
    users: { path: '/admin/users', roles: ['admin'] },
    settings: { path: '/admin/settings', roles: ['admin'] },
  },

  // 错误页面
  error: {
    notFound: { path: '/404', public: true },
    forbidden: { path: '/403', public: true },
    serverError: { path: '/500', public: true },
  },
} as const;

// 扁平化路由配置
export const FLAT_ROUTES = Object.entries(ROUTES).reduce((acc, [section, routes]) => {
  Object.entries(routes).forEach(([name, config]) => {
    acc[`${section}.${name}`] = config;
  });
  return acc;
}, {} as Record<string, RouteConfig>);

// 获取路由配置
export function getRouteConfig(path: string): RouteConfig | undefined {
  return Object.values(FLAT_ROUTES).find(route => route.path === path);
}

// 检查路由访问权限
export function checkRouteAccess(
  path: string,
  userRoles?: string[],
  userPermissions?: string[]
): boolean {
  const config = getRouteConfig(path);
  
  if (!config) return false;
  if (config.public) return true;
  
  if (config.roles && userRoles) {
    if (!config.roles.some(role => userRoles.includes(role))) {
      return false;
    }
  }
  
  if (config.permissions && userPermissions) {
    if (!config.permissions.some(permission => userPermissions.includes(permission))) {
      return false;
    }
  }
  
  return true;
}
