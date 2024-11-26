import { MONITORING_CONFIG } from '../config/monitoring.config';
import { logger } from '../../logger/config/logger.config';

class PerformanceMonitor {
  private isInitialized = false;

  initialize() {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    this.observeWebVitals();
    this.observeResources();
    this.observeNavigation();

    this.isInitialized = true;
  }

  private observeWebVitals() {
    if ('web-vital' in window) {
      // @ts-ignore
      window.webVitals.getCLS(this.handleWebVital);
      // @ts-ignore
      window.webVitals.getFID(this.handleWebVital);
      // @ts-ignore
      window.webVitals.getLCP(this.handleWebVital);
      // @ts-ignore
      window.webVitals.getFCP(this.handleWebVital);
      // @ts-ignore
      window.webVitals.getTTFB(this.handleWebVital);
    }
  }

  private observeResources() {
    if (!MONITORING_CONFIG.resource.trackLoading) return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (Math.random() > MONITORING_CONFIG.resource.sampleRate) return;

        logger.debug('Resource Performance:', {
          name: entry.name,
          type: entry.entryType,
          duration: entry.duration,
          startTime: entry.startTime,
        });
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  private observeNavigation() {
    if (!MONITORING_CONFIG.performance.sampleRate) return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (Math.random() > MONITORING_CONFIG.performance.sampleRate) return;

        logger.debug('Navigation Performance:', {
          name: entry.name,
          type: entry.entryType,
          duration: entry.duration,
          startTime: entry.startTime,
        });
      });
    });

    observer.observe({ entryTypes: ['navigation'] });
  }

  private handleWebVital = (metric: any) => {
    if (Math.random() > MONITORING_CONFIG.performance.sampleRate) return;

    const threshold = MONITORING_CONFIG.performance.thresholds[metric.name];
    
    if (threshold && metric.value > threshold) {
      logger.warn(`Performance threshold exceeded for ${metric.name}:`, {
        value: metric.value,
        threshold,
        id: metric.id,
      });
    }

    logger.debug('Web Vital:', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
    });
  };
}

export const performanceMonitor = new PerformanceMonitor();
