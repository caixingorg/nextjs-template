# API 接口规范

## 1. 接口命名规范

### 1.1 RESTful API 规范
- 使用名词复数形式
- 使用小写字母和连字符
- 避免使用动词

示例：
```
✅ 正确：
GET /api/users
GET /api/users/123
POST /api/articles

❌ 错误：
GET /api/getUser
POST /api/createArticle
```

### 1.2 接口版本控制
- 在 URL 中使用版本号
- 示例：`/api/v1/users`

## 2. 请求规范

### 2.1 请求方法
- GET：查询资源
- POST：创建资源
- PUT：更新资源（全量更新）
- PATCH：更新资源（部分更新）
- DELETE：删除资源

### 2.2 请求参数
- Query 参数：用于过滤和分页
- Body 参数：用于创建和更新
- Path 参数：用于标识资源

### 2.3 参数命名
- 使用 camelCase
- 参数名应具有描述性
- 布尔类型参数使用 is/has/should 前缀

## 3. 响应规范

### 3.1 状态码使用
- 200：成功
- 201：创建成功
- 400：请求错误
- 401：未授权
- 403：禁止访问
- 404：资源不存在
- 500：服务器错误

### 3.2 响应格式

```typescript
interface ApiResponse<T> {
  code: number;       // 业务状态码
  message: string;    // 提示信息
  data: T;           // 响应数据
  timestamp: number; // 时间戳
}
```

示例：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "name": "张三"
  },
  "timestamp": 1677649423000
}
```

## 4. 错误处理

### 4.1 错误响应格式
```typescript
interface ApiError {
  code: number;       // 错误码
  message: string;    // 错误信息
  details?: string;   // 详细错误信息
  timestamp: number;  // 时间戳
}
```

### 4.2 错误码规范
- 10xxx：系统级错误
- 20xxx：认证授权错误
- 30xxx：参数验证错误
- 40xxx：业务逻辑错误

## 5. 安全规范

### 5.1 认证
- 使用 JWT Token
- Token 在 Header 中传递
- 使用 HTTPS

### 5.2 权限控制
- 基于 RBAC 模型
- 接口级别的权限控制
- 数据级别的权限控制

## 6. 性能优化

### 6.1 分页
- 默认分页大小：20
- 最大分页大小：100
- 使用游标分页处理大数据量

### 6.2 缓存
- 合理使用 HTTP 缓存
- 实现数据缓存策略
- 缓存失效策略

## 7. 文档规范

### 7.1 接口文档
- 使用 Swagger/OpenAPI 规范
- 详细的接口说明
- 请求/响应示例

### 7.2 文档内容
- 接口用途
- 请求参数说明
- 响应格式说明
- 错误码说明
- 调用示例

## 8. 开发流程

### 8.1 接口设计
1. 编写接口文档
2. 评审确认
3. 开发实现
4. 测试验证

### 8.2 测试要求
- 单元测试覆盖
- 接口测试用例
- 性能测试指标
