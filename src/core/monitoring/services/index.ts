import { performanceMonitor } from './performance';
import { errorMonitor } from './error';
import { apiMonitor } from './api';

class MonitoringService {
  initialize() {
    if (typeof window === 'undefined') {
      return;
    }

    // Initialize all monitors
    performanceMonitor.initialize();
    errorMonitor.initialize();
    apiMonitor.initialize();
  }
}

export const monitoringService = new MonitoringService();

// Export individual monitors for direct access when needed
export {
  performanceMonitor,
  errorMonitor,
  apiMonitor,
};
