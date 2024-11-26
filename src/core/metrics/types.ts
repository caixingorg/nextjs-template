/**
 * 指标类型枚举
 */
export enum MetricType {
  COUNTER = 'counter',
  GAUGE = 'gauge',
  HISTOGRAM = 'histogram',
  SUMMARY = 'summary'
}

/**
 * 指标标签接口
 */
export interface MetricLabels {
  [key: string]: string | number | boolean;
}

/**
 * 指标值接口
 */
export interface MetricValue {
  value: number;
  timestamp: number;
  labels?: MetricLabels;
}

/**
 * 指标接口
 */
export interface Metric {
  name: string;
  type: MetricType;
  description?: string;
  unit?: string;
  values: MetricValue[];
}

/**
 * 指标收集器接口
 */
export interface MetricCollector {
  collect(): Promise<Metric[]>;
}

/**
 * 指标存储接口
 */
export interface MetricStorage {
  save(metrics: Metric[]): Promise<void>;
  query(options: MetricQueryOptions): Promise<Metric[]>;
}

/**
 * 指标查询选项
 */
export interface MetricQueryOptions {
  names?: string[];
  types?: MetricType[];
  startTime?: number;
  endTime?: number;
  labels?: MetricLabels;
  limit?: number;
  offset?: number;
}

/**
 * 指标报告接口
 */
export interface MetricReport {
  metrics: Metric[];
  summary: {
    totalMetrics: number;
    byType: Record<MetricType, number>;
    timeRange: {
      start: number;
      end: number;
    };
  };
}

/**
 * 指标配置接口
 */
export interface MetricsConfig {
  collectors?: MetricCollector[];
  storage?: MetricStorage;
  defaultLabels?: MetricLabels;
  collectInterval?: number;
  maxValues?: number;
  enableDefaultMetrics?: boolean;
}
