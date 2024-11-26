import { MetricCollector, Metric, MetricType } from '../types';

/**
 * 性能指标收集器
 */
export class PerformanceCollector implements MetricCollector {
  private readonly metrics: Record<string, Metric> = {};

  constructor() {
    this.initMetrics();
  }

  /**
   * 初始化指标
   */
  private initMetrics(): void {
    // 页面加载时间
    this.metrics['page_load_time'] = {
      name: 'page_load_time',
      type: MetricType.HISTOGRAM,
      description: 'Page load time in milliseconds',
      unit: 'ms',
      values: []
    };

    // 首次内容绘制时间
    this.metrics['first_contentful_paint'] = {
      name: 'first_contentful_paint',
      type: MetricType.HISTOGRAM,
      description: 'First contentful paint time in milliseconds',
      unit: 'ms',
      values: []
    };

    // 最大内容绘制时间
    this.metrics['largest_contentful_paint'] = {
      name: 'largest_contentful_paint',
      type: MetricType.HISTOGRAM,
      description: 'Largest contentful paint time in milliseconds',
      unit: 'ms',
      values: []
    };

    // 首次输入延迟
    this.metrics['first_input_delay'] = {
      name: 'first_input_delay',
      type: MetricType.HISTOGRAM,
      description: 'First input delay in milliseconds',
      unit: 'ms',
      values: []
    };

    // 累积布局偏移
    this.metrics['cumulative_layout_shift'] = {
      name: 'cumulative_layout_shift',
      type: MetricType.GAUGE,
      description: 'Cumulative layout shift score',
      values: []
    };
  }

  /**
   * 收集性能指标
   */
  async collect(): Promise<Metric[]> {
    const timestamp = Date.now();

    // 收集性能指标
    if (typeof window !== 'undefined') {
      const { performance } = window;

      // 页面加载时间
      const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.metrics['page_load_time'].values.push({
        value: pageLoadTime,
        timestamp
      });

      // Web Vitals
      if ('getEntriesByType' in performance) {
        // FCP
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
        if (fcp) {
          this.metrics['first_contentful_paint'].values.push({
            value: fcp.startTime,
            timestamp
          });
        }

        // LCP
        const lcp = performance.getEntriesByType('largest-contentful-paint').pop();
        if (lcp) {
          this.metrics['largest_contentful_paint'].values.push({
            value: lcp.startTime,
            timestamp
          });
        }
      }

      // 清理性能条目
      if ('clearResourceTimings' in performance) {
        performance.clearResourceTimings();
      }
    }

    return Object.values(this.metrics);
  }
}
