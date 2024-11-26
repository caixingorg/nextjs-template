import React from 'react';
import { usePermission, useAuth } from '../hooks';
import { PermissionGuard, RoleGuard, withAuth } from '../components';

/**
 * 管理员仪表盘组件
 */
function AdminDashboard() {
  const { user } = useAuth();
  const { checkPermission, checkRole } = usePermission();

  // 检查特定权限
  const { hasPermission: canManageUsers } = checkPermission('manage:users');
  const { hasPermission: canViewReports } = checkPermission('view:reports');

  return (
    <div className="admin-dashboard">
      <h1>管理员仪表盘</h1>
      <p>欢迎, {user?.name}</p>

      {/* 使用权限守卫组件 */}
      <PermissionGuard 
        permission="manage:users"
        fallback={<p>您没有管理用户的权限</p>}
      >
        <div className="user-management">
          <h2>用户管理</h2>
          {/* 用户管理相关组件 */}
        </div>
      </PermissionGuard>

      {/* 使用角色守卫组件 */}
      <RoleGuard 
        role="admin"
        fallback={<p>此功能仅对管理员开放</p>}
      >
        <div className="admin-tools">
          <h2>管理员工具</h2>
          {/* 管理员工具相关组件 */}
        </div>
      </RoleGuard>

      {/* 条件渲染 */}
      {canManageUsers && (
        <div className="user-stats">
          <h2>用户统计</h2>
          {/* 用户统计相关组件 */}
        </div>
      )}

      {canViewReports && (
        <div className="reports">
          <h2>报表中心</h2>
          {/* 报表相关组件 */}
        </div>
      )}
    </div>
  );
}

// 使用高阶组件添加认证检查
export default withAuth(AdminDashboard);
