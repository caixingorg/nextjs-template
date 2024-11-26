import { RouteConfig } from './types';

/**
 * 路由配置
 * @description 定义应用的路由结构
 */
export const routes: RouteConfig[] = [
  {
    path: '/',
    meta: {
      title: '首页',
      description: '应用首页',
      layout: 'default'
    }
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      description: '用户登录',
      layout: 'blank'
    }
  },
  {
    path: '/dashboard',
    meta: {
      title: '仪表盘',
      description: '用户仪表盘',
      requireAuth: true,
      layout: 'dashboard',
      cache: true
    },
    children: [
      {
        path: '/dashboard/overview',
        meta: {
          title: '概览',
          keepAlive: true
        }
      },
      {
        path: '/dashboard/profile',
        meta: {
          title: '个人信息',
          permissions: ['profile.view']
        }
      },
      {
        path: '/dashboard/settings',
        meta: {
          title: '设置',
          permissions: ['settings.view']
        }
      }
    ]
  },
  {
    path: '/admin',
    meta: {
      title: '管理后台',
      requireAuth: true,
      permissions: ['admin.access'],
      layout: 'admin'
    },
    children: [
      {
        path: '/admin/users',
        meta: {
          title: '用户管理',
          permissions: ['users.manage']
        }
      },
      {
        path: '/admin/roles',
        meta: {
          title: '角色管理',
          permissions: ['roles.manage']
        }
      }
    ]
  },
  {
    path: '/404',
    meta: {
      title: '页面未找到',
      layout: 'blank'
    }
  },
  {
    path: '/500',
    meta: {
      title: '服务器错误',
      layout: 'blank'
    }
  }
];

/**
 * 获取路由配置
 * @param path 路由路径
 * @returns 路由配置
 */
export function getRouteConfig(path: string): RouteConfig | undefined {
  // 扁平化路由配置
  const flattenRoutes = (routes: RouteConfig[]): RouteConfig[] => {
    return routes.reduce<RouteConfig[]>((acc, route) => {
      acc.push(route);
      if (route.children) {
        acc.push(...flattenRoutes(route.children));
      }
      return acc;
    }, []);
  };

  // 在扁平化的路由中查找
  return flattenRoutes(routes).find(route => route.path === path);
}

/**
 * 获取路由元数据
 * @param path 路由路径
 * @returns 路由元数据
 */
export function getRouteMetadata(path: string) {
  return getRouteConfig(path)?.meta;
}

/**
 * 获取面包屑
 * @param path 当前路径
 * @returns 面包屑配置
 */
export function getBreadcrumbs(path: string) {
  const breadcrumbs: { path: string; title: string }[] = [];
  const pathSegments = path.split('/').filter(Boolean);
  
  let currentPath = '';
  for (const segment of pathSegments) {
    currentPath += `/${segment}`;
    const route = getRouteConfig(currentPath);
    if (route?.meta?.title) {
      breadcrumbs.push({
        path: currentPath,
        title: route.meta.title
      });
    }
  }
  
  return breadcrumbs;
}
