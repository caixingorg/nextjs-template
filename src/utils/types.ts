/**
 * 工具函数类型定义
 * @description 定义工具函数相关的类型
 * @module utils/types
 */

/**
 * 可为空类型
 */
export type Nullable<T> = T | null;

/**
 * 可为空或未定义类型
 */
export type Optional<T> = T | null | undefined;

/**
 * 记录类型
 */
export type Record<K extends keyof any, T> = {
  [P in K]: T;
};

/**
 * 部分记录类型
 */
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

/**
 * 函数类型
 */
export type Fn<T = any, R = T> = (...args: T[]) => R;

/**
 * 异步函数类型
 */
export type AsyncFn<T = any, R = T> = (...args: T[]) => Promise<R>;

/**
 * 构造函数类型
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 * 键类型
 */
export type KeyOf<T> = keyof T;

/**
 * 值类型
 */
export type ValueOf<T> = T[KeyOf<T>];

/**
 * 深度部分类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 深度必需类型
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * 深度只读类型
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 排除类型
 */
export type Exclude<T, U> = T extends U ? never : T;

/**
 * 提取类型
 */
export type Extract<T, U> = T extends U ? T : never;

/**
 * 非空类型
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 参数类型
 */
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * 返回值类型
 */
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
