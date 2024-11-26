import { MetricCollector, Metric, MetricType } from '../types';

/**
 * 错误指标收集器
 */
export class ErrorCollector implements MetricCollector {
  private readonly metrics: Record<string, Metric> = {};

  constructor() {
    this.initMetrics();
    this.initListeners();
  }

  /**
   * 初始化指标
   */
  private initMetrics(): void {
    // JavaScript错误
    this.metrics['js_errors'] = {
      name: 'js_errors',
      type: MetricType.COUNTER,
      description: 'Number of JavaScript errors',
      values: []
    };

    // API错误
    this.metrics['api_errors'] = {
      name: 'api_errors',
      type: MetricType.COUNTER,
      description: 'Number of API errors',
      values: []
    };

    // 资源加载错误
    this.metrics['resource_errors'] = {
      name: 'resource_errors',
      type: MetricType.COUNTER,
      description: 'Number of resource loading errors',
      values: []
    };

    // 未处理的Promise错误
    this.metrics['unhandled_rejections'] = {
      name: 'unhandled_rejections',
      type: MetricType.COUNTER,
      description: 'Number of unhandled Promise rejections',
      values: []
    };
  }

  /**
   * 初始化错误监听器
   */
  private initListeners(): void {
    if (typeof window !== 'undefined') {
      // JavaScript错误
      window.addEventListener('error', (event) => {
        const timestamp = Date.now();
        const isResourceError = event.target && (
          event.target instanceof HTMLScriptElement ||
          event.target instanceof HTMLLinkElement ||
          event.target instanceof HTMLImageElement
        );

        if (isResourceError) {
          this.metrics['resource_errors'].values.push({
            value: 1,
            timestamp,
            labels: {
              url: (event.target as HTMLElement).src || (event.target as HTMLElement).href
            }
          });
        } else {
          this.metrics['js_errors'].values.push({
            value: 1,
            timestamp,
            labels: {
              message: event.message,
              filename: event.filename,
              lineno: event.lineno,
              colno: event.colno
            }
          });
        }
      });

      // 未处理的Promise错误
      window.addEventListener('unhandledrejection', (event) => {
        this.metrics['unhandled_rejections'].values.push({
          value: 1,
          timestamp: Date.now(),
          labels: {
            reason: event.reason?.toString()
          }
        });
      });
    }
  }

  /**
   * 记录API错误
   */
  public recordApiError(error: Error, endpoint: string): void {
    this.metrics['api_errors'].values.push({
      value: 1,
      timestamp: Date.now(),
      labels: {
        message: error.message,
        endpoint
      }
    });
  }

  /**
   * 收集错误指标
   */
  async collect(): Promise<Metric[]> {
    return Object.values(this.metrics);
  }
}
