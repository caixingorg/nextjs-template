# Next.js Enterprise Template 项目结构说明

## 项目概述

这是一个基于 Next.js 14 的企业级前端项目模板，采用 TypeScript 开发，集成了常用的企业级功能和最佳实践。

## 技术栈

- Next.js 14.0.3
- React 18
- TypeScript
- Prisma (ORM)
- NextAuth.js (认证)
- Zod (数据验证)
- Zustand (状态管理)
- React Query (服务端状态)

## 目录结构说明

```
src/
├── app/                    # Next.js应用入口
│   ├── layout.tsx         # 根布局组件
│   ├── page.tsx           # 首页组件
│   └── api/               # API路由
│
├── assets/                # 静态资源
│   ├── images/           # 图片资源
│   ├── icons/            # 图标资源
│   └── styles/           # 全局样式
│
├── components/           # 组件目录
│   ├── business/        # 业务组件
│   └── common/          # 通用组件
│
├── core/                # 核心功能模块
│   ├── auth/           # 认证模块
│   │   ├── config/     # 认证配置
│   │   └── utils/      # 认证工具
│   ├── cache/          # 缓存模块
│   │   └── query-client.ts  # React Query配置
│   ├── error/          # 错误处理
│   │   ├── handlers/   # 错误处理器
│   │   └── boundary/   # 错误边界
│   ├── logger/         # 日志模块
│   │   └── winston.ts  # Winston配置
│   ├── metrics/        # 监控模块
│   │   ├── collectors/ # 指标收集
│   │   └── storage/    # 指标存储
│   ├── router/         # 路由模块
│   │   ├── guards/     # 路由守卫
│   │   └── middleware/ # 路由中间件
│   └── security/       # 安全模块
│       ├── csrf/       # CSRF防护
│       ├── xss/        # XSS防护
│       └── encryption/ # 加密工具
│
├── config/             # 配置文件
│   ├── constants/      # 常量定义
│   └── env/           # 环境配置
│
├── hooks/             # 自定义Hooks
│
├── locales/          # 国际化资源
│   ├── config/       # 国际化配置
│   └── lang/         # 语言文件
│
├── services/         # 服务层
│   ├── api/         # API服务
│   └── http/        # HTTP请求封装
│
├── store/           # 状态管理
│   └── slices/      # 状态切片
│
├── types/           # 类型定义
│
└── utils/           # 通用工具函数
    ├── format/      # 格式化工具
    ├── validation/  # 验证工具
    └── db/          # 数据库工具
```

## 核心模块说明

### 1. 认证模块 (NextAuth.js)
- `core/auth/`
  - `config/`: NextAuth配置
  - `components/`: 认证UI组件
  - `hooks/`: 认证相关hooks

### 2. 缓存模块 (React Query)
- `core/cache/`
  - `config/`: React Query配置
  - `hooks/`: 数据查询hooks
  - `utils/`: 缓存工具函数

### 3. 日志模块 (Winston)
- `core/logger/`
  - `config/`: Winston配置
  - `formatters/`: 日志格式化
  - `utils/`: 日志工具函数

### 4. 安全模块 (Helmet + DOMPurify)
- `core/security/`
  - `config/`: Helmet配置
  - `utils/`: 安全工具函数（XSS防护等）

## 开发规范

### 1. 目录规范
- 业务组件放在 components/business 下
- 通用组件放在 components/common 下
- 核心功能模块统一放在 core 目录下
- 配置文件集中在 config 目录下

### 2. 命名规范
- 文件名：使用小写字母，多个单词用 - 连接
- 组件名：使用大驼峰命名法
- 函数名：使用小驼峰命名法
- 常量名：使用大写字母，多个单词用 _ 连接

### 3. 代码规范
- 使用 TypeScript 强类型
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循函数式编程原则

## 使用说明

### 开发环境要求
- Node.js >= 18
- npm >= 9

### 开发命令
```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 生产模式运行
npm run start

# 代码检查
npm run lint
```

## 最佳实践

1. **状态管理**
   - 使用 Zustand 进行全局状态管理
   - 使用 React Query 处理服务端状态
   - 合理使用 Context API 处理组件树状态

2. **性能优化**
   - 使用 Next.js 的 Image 组件优化图片
   - 实现组件懒加载
   - 合理使用缓存策略

3. **错误处理**
   - 统一的错误处理机制
   - 友好的错误提示
   - 完善的错误日志记录

4. **安全性**
   - 实现 CSRF 防护
   - XSS 防护
   - 请求加密
   - 敏感信息保护

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
