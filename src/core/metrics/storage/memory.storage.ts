import { MetricStorage, Metric, MetricQueryOptions } from '../types';

/**
 * 内存指标存储
 */
export class MemoryMetricStorage implements MetricStorage {
  private metrics: Metric[] = [];
  private readonly maxSize: number;

  constructor(maxSize = 1000) {
    this.maxSize = maxSize;
  }

  /**
   * 保存指标
   */
  async save(metrics: Metric[]): Promise<void> {
    this.metrics = this.metrics.concat(metrics);

    // 保持指标数量在限制内
    if (this.metrics.length > this.maxSize) {
      this.metrics = this.metrics.slice(-this.maxSize);
    }
  }

  /**
   * 查询指标
   */
  async query(options: MetricQueryOptions): Promise<Metric[]> {
    let result = this.metrics;

    // 按名称过滤
    if (options.names?.length) {
      result = result.filter(metric => options.names!.includes(metric.name));
    }

    // 按类型过滤
    if (options.types?.length) {
      result = result.filter(metric => options.types!.includes(metric.type));
    }

    // 按时间范围过滤
    if (options.startTime || options.endTime) {
      result = result.map(metric => ({
        ...metric,
        values: metric.values.filter(value => {
          if (options.startTime && value.timestamp < options.startTime) {
            return false;
          }
          if (options.endTime && value.timestamp > options.endTime) {
            return false;
          }
          return true;
        })
      }));
    }

    // 按标签过滤
    if (options.labels) {
      result = result.map(metric => ({
        ...metric,
        values: metric.values.filter(value => {
          if (!value.labels) return false;
          return Object.entries(options.labels!).every(([key, val]) => 
            value.labels![key] === val
          );
        })
      }));
    }

    // 分页
    if (options.offset || options.limit) {
      const start = options.offset || 0;
      const end = options.limit ? start + options.limit : undefined;
      result = result.slice(start, end);
    }

    return result;
  }
}
