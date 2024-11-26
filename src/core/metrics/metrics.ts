import { 
  Metric, 
  MetricCollector, 
  MetricStorage, 
  MetricQueryOptions, 
  MetricsConfig,
  MetricReport 
} from './types';
import { PerformanceCollector } from './collectors/performance.collector';
import { ErrorCollector } from './collectors/error.collector';
import { MemoryMetricStorage } from './storage/memory.storage';

/**
 * 指标管理器
 */
export class MetricsManager {
  private readonly collectors: MetricCollector[];
  private readonly storage: MetricStorage;
  private readonly defaultLabels: Record<string, string | number | boolean>;
  private readonly collectInterval: number;
  private intervalId?: NodeJS.Timeout;

  constructor(config: MetricsConfig = {}) {
    this.collectors = config.collectors || [
      new PerformanceCollector(),
      new ErrorCollector()
    ];
    this.storage = config.storage || new MemoryMetricStorage();
    this.defaultLabels = config.defaultLabels || {};
    this.collectInterval = config.collectInterval || 60000; // 默认1分钟
  }

  /**
   * 启动指标收集
   */
  public start(): void {
    if (this.intervalId) {
      return;
    }

    // 立即收集一次
    this.collect();

    // 定期收集
    this.intervalId = setInterval(() => {
      this.collect();
    }, this.collectInterval);
  }

  /**
   * 停止指标收集
   */
  public stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  /**
   * 收集指标
   */
  private async collect(): Promise<void> {
    try {
      // 从所有收集器收集指标
      const metricsPromises = this.collectors.map(collector => collector.collect());
      const metricsArrays = await Promise.all(metricsPromises);
      
      // 合并指标并添加默认标签
      const metrics = metricsArrays.flat().map(metric => ({
        ...metric,
        values: metric.values.map(value => ({
          ...value,
          labels: {
            ...this.defaultLabels,
            ...value.labels
          }
        }))
      }));

      // 保存指标
      await this.storage.save(metrics);
    } catch (error) {
      console.error('Failed to collect metrics:', error);
    }
  }

  /**
   * 查询指标
   */
  public async query(options: MetricQueryOptions): Promise<Metric[]> {
    return this.storage.query(options);
  }

  /**
   * 生成指标报告
   */
  public async generateReport(options: MetricQueryOptions = {}): Promise<MetricReport> {
    const metrics = await this.query(options);
    
    // 计算时间范围
    let minTimestamp = Infinity;
    let maxTimestamp = -Infinity;
    const typeCount: Record<string, number> = {};

    metrics.forEach(metric => {
      // 统计类型
      typeCount[metric.type] = (typeCount[metric.type] || 0) + 1;

      // 更新时间范围
      metric.values.forEach(value => {
        minTimestamp = Math.min(minTimestamp, value.timestamp);
        maxTimestamp = Math.max(maxTimestamp, value.timestamp);
      });
    });

    return {
      metrics,
      summary: {
        totalMetrics: metrics.length,
        byType: typeCount,
        timeRange: {
          start: minTimestamp === Infinity ? 0 : minTimestamp,
          end: maxTimestamp === -Infinity ? 0 : maxTimestamp
        }
      }
    };
  }
}
