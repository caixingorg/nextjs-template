import { MONITORING_CONFIG } from '../config/monitoring.config';
import { logger } from '../../logger/config/logger.config';

interface APIMetrics {
  url: string;
  method: string;
  status: number;
  duration: number;
  timestamp: number;
  error?: any;
}

class APIMonitor {
  private metrics: APIMetrics[] = [];
  private isInitialized = false;

  initialize() {
    if (this.isInitialized) {
      return;
    }

    this.setupPeriodicFlush();
    this.isInitialized = true;
  }

  logAPICall(metrics: APIMetrics) {
    if (Math.random() > MONITORING_CONFIG.api.sampleRate) return;

    this.metrics.push({
      ...metrics,
      timestamp: Date.now(),
    });

    // Check for slow requests
    if (metrics.duration > MONITORING_CONFIG.api.slowRequestThreshold) {
      logger.warn('Slow API Request:', {
        url: metrics.url,
        method: metrics.method,
        duration: metrics.duration,
        threshold: MONITORING_CONFIG.api.slowRequestThreshold,
      });
    }

    // Check for error responses
    if (metrics.status >= 400) {
      logger.error('API Error:', {
        url: metrics.url,
        method: metrics.method,
        status: metrics.status,
        error: metrics.error,
      });
    }

    // Flush if buffer is full
    if (this.metrics.length >= MONITORING_CONFIG.api.batchSize) {
      this.flush();
    }
  }

  private setupPeriodicFlush() {
    if (typeof window === 'undefined') return;

    setInterval(() => {
      this.flush();
    }, MONITORING_CONFIG.api.flushInterval);
  }

  private flush() {
    if (this.metrics.length === 0) return;

    const metricsToSend = [...this.metrics];
    this.metrics = [];

    // Calculate aggregated metrics
    const aggregatedMetrics = this.calculateAggregatedMetrics(metricsToSend);

    // Log aggregated metrics
    logger.info('API Metrics:', {
      timestamp: Date.now(),
      metrics: aggregatedMetrics,
      raw: MONITORING_CONFIG.api.logRawMetrics ? metricsToSend : undefined,
    });
  }

  private calculateAggregatedMetrics(metrics: APIMetrics[]) {
    const endpoints = new Map<string, {
      count: number;
      totalDuration: number;
      errors: number;
      statusCodes: Map<number, number>;
    }>();

    metrics.forEach((metric) => {
      const key = `${metric.method} ${metric.url}`;
      const current = endpoints.get(key) || {
        count: 0,
        totalDuration: 0,
        errors: 0,
        statusCodes: new Map(),
      };

      current.count++;
      current.totalDuration += metric.duration;
      if (metric.status >= 400) current.errors++;

      const statusCount = current.statusCodes.get(metric.status) || 0;
      current.statusCodes.set(metric.status, statusCount + 1);

      endpoints.set(key, current);
    });

    return Array.from(endpoints.entries()).map(([endpoint, data]) => ({
      endpoint,
      requests: data.count,
      averageDuration: data.totalDuration / data.count,
      errorRate: data.errors / data.count,
      statusCodes: Object.fromEntries(data.statusCodes),
    }));
  }
}

export const apiMonitor = new APIMonitor();
