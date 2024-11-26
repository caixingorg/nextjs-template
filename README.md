This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Next.js 项目模板

这是一个基于 [Next.js](https://nextjs.org/) 的前端项目模板，使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 构建。

## 项目特性

- 🚀 基于 Next.js 14 最新特性
- 📦 TypeScript 支持
- 🎨 TailwindCSS 样式解决方案
- 🌍 i18n 国际化支持
- 🔐 内置权限管理
- 📊 状态管理集成
- 🎯 ESLint + Prettier 代码规范
- 🧪 单元测试支持

## 项目结构

```
src/
├── app/                # Next.js 应用页面
│   ├── [locale]/      # 国际化路由
│   ├── api/           # API路由
│   └── middleware/    # 中间件
├── assets/            # 静态资源
├── components/        # 组件
│   ├── business/     # 业务组件
│   ├── common/       # 通用组件
│   └── layout/       # 布局组件
├── config/           # 配置文件
│   ├── app.ts       # 应用配置
│   ├── api.ts       # API配置
│   └── env.ts       # 环境变量
├── constants/        # 常量定义
├── hooks/            # React Hooks
├── locale/           # 国际化资源
│   ├── lang/        # 语言文件
│   └── config/      # 国际化配置
├── services/         # 服务
│   ├── api/         # API服务
│   ├── http/        # HTTP客户端
│   └── storage/     # 存储服务
├── stores/          # 状态管理
├── styles/          # 样式文件
├── types/           # 类型定义
└── utils/           # 工具函数
    ├── format/      # 格式化
    ├── security/    # 安全
    └── validation/  # 验证
```

### 目录说明

- **app**: Next.js 13+ 应用页面和API路由
- **assets**: 静态资源文件，如图片、字体等
- **components**: React组件
  - business: 业务相关组件
  - common: 通用UI组件
  - layout: 布局相关组件
- **config**: 配置文件
- **constants**: 常量定义
- **hooks**: React自定义Hooks
- **locale**: 国际化资源
- **services**: 服务层
- **stores**: 状态管理
- **styles**: 样式文件
- **types**: TypeScript类型定义
- **utils**: 工具函数

## 权限系统

权限系统提供了一套完整的权限控制解决方案，包括：

### 1. 权限Hook

```typescript
const { checkPermission, checkRole } = usePermission();
const { hasPermission } = checkPermission('manage:users');
```

### 2. 权限组件

```typescript
// 权限守卫
<PermissionGuard permission="manage:users">
  <RestrictedContent />
</PermissionGuard>

// 角色守卫
<RoleGuard role="admin">
  <AdminContent />
</RoleGuard>

// 认证守卫
<AuthGuard>
  <ProtectedContent />
</AuthGuard>
```

### 3. 高阶组件

```typescript
// 添加权限检查
export default withPermission(Component, 'manage:users');

// 添加角色检查
export default withRole(Component, 'admin');

// 添加认证检查
export default withAuth(Component);
```

### 4. 路由权限

在 `src/auth/middleware.ts` 中配置路由权限：

```typescript
export const routePermissions = [
  {
    path: '/admin',
    roles: ['admin'],
    requireAuth: true,
    redirectTo: '/login'
  }
];
```

### 5. 状态管理

使用 Zustand 进行状态管理：

```typescript
const { user, login, logout } = useAuth();
```

## 环境配置

项目支持三种环境：

### 开发环境 (Development)

```bash
# 启动开发服务器
npm run dev
# 或
yarn dev
```

环境变量文件：`.env.development`

### 测试环境 (Test)

```bash
# 启动测试环境开发服务器
npm run dev:test
# 或
yarn dev:test

# 构建测试环境
npm run build:test
# 或
yarn build:test
```

环境变量文件：`.env.test`

### 生产环境 (Production)

```bash
# 启动生产环境开发服务器
npm run dev:prod
# 或
yarn dev:prod

# 构建生产环境
npm run build:prod
# 或
yarn build:prod
```

环境变量文件：`.env.production`

### 环境变量说明

项目使用以下环境变量：

- `NODE_ENV`: 环境标识
- `NEXT_PUBLIC_APP_NAME`: 应用名称
- `NEXT_PUBLIC_APP_ENV`: 应用环境
- `NEXT_PUBLIC_APP_URL`: 应用URL
- `NEXT_PUBLIC_API_URL`: API地址
- `NEXT_PUBLIC_API_TIMEOUT`: API超时时间
- `NEXT_PUBLIC_API_PREFIX`: API前缀
- `DATABASE_URL`: 数据库连接URL
- `NEXTAUTH_SECRET`: 认证密钥
- `NEXTAUTH_URL`: 认证URL
- `NEXT_PUBLIC_LOG_LEVEL`: 日志级别
- `NEXT_PUBLIC_UPLOAD_URL`: 上传服务地址
- `NEXT_PUBLIC_STATIC_URL`: 静态资源地址

首次使用时，请复制 `.env.example` 文件并根据实际情况修改配置。

## 快速开始

1. 安装依赖：

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

2. 启动开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目。

## 开发指南

- 组件开发规范请参考 `docs/组件开发规范.md`
- API 接口规范请参考 `docs/API接口规范.md`
- 提交代码前请确保通过 ESLint 检查：`npm run lint`

## 开发工具

项目提供了一些开发工具来提高开发效率：

### 代码生成器

位置：`scripts/tools/generators`

1. 组件生成器
   - 用途：快速生成组件模板
   - 位置：`scripts/tools/generators/component`

2. 页面生成器
   - 用途：快速生成页面模板
   - 位置：`scripts/tools/generators/page`

### 验证工具

位置：`scripts/tools/validators`

用于验证代码规范和项目配置。

## 构建部署

执行以下命令构建项目：

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

## 更多资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [TailwindCSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT

## 业务模块结构

项目包含以下主要业务模块：

### 1. 用户中心模块 (User Center)
- 个人资料管理
- 用户设置
- 用户仪表盘

### 2. 认证模块 (Authentication)
- 登录功能
- 注册功能
- 密码管理

### 3. 商品模块 (Product)
- 商品列表
- 商品详情
- 商品比较

### 4. 购物车模块 (Cart)
- 购物车列表
- 购物车管理
- 购物车结算

### 5. 订单模块 (Order)
- 订单列表
- 订单详情
- 结账流程

### 6. 评价模块 (Review)
- 评价列表
- 评价表单
- 评价统计

### 7. 搜索模块 (Search)
- 搜索功能
- 搜索结果
- 搜索过滤

### 8. 分类模块 (Category)
- 分类列表
- 分类树
- 分类导航

每个模块都遵循以下开发规范：
1. 组件化开发
2. TypeScript 类型定义
3. 单元测试覆盖
4. 国际化支持
5. 主题定制支持
