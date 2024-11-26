export const MONITORING_CONFIG = {
  // 性能监控配置
  performance: {
    // 性能指标阈值（毫秒）
    thresholds: {
      FCP: 2000,    // First Contentful Paint
      LCP: 2500,    // Largest Contentful Paint
      FID: 100,     // First Input Delay
      CLS: 0.1,     // Cumulative Layout Shift
      TTFB: 600,    // Time to First Byte
      TTI: 3000,    // Time to Interactive
    },
    // 采样率 (0-1)
    sampleRate: 0.1,
  },

  // 错误监控配置
  error: {
    // 是否捕获未处理的Promise错误
    unhandledPromise: true,
    // 是否捕获未处理的错误
    unhandledError: true,
    // 是否捕获控制台错误
    consoleError: true,
    // 错误采样率
    sampleRate: 1.0,
  },

  // 用户行为监控配置
  behavior: {
    // 是否启用点击追踪
    trackClicks: true,
    // 是否启用路由变化追踪
    trackRoutes: true,
    // 是否启用控制台追踪
    trackConsole: false,
    // 行为采样率
    sampleRate: 0.1,
  },

  // API监控配置
  api: {
    // 是否追踪API调用
    trackCalls: true,
    // 是否追踪API性能
    trackPerformance: true,
    // 是否追踪API错误
    trackErrors: true,
    // API采样率
    sampleRate: 0.5,
    // 慢请求阈值（毫秒）
    slowRequestThreshold: 1000,
    // 批量处理大小
    batchSize: 50,
    // 刷新间隔（毫秒）
    flushInterval: 30000,
    // 是否记录原始指标
    logRawMetrics: false,
  },

  // 资源监控配置
  resource: {
    // 是否追踪资源加载
    trackLoading: true,
    // 是否追踪资源错误
    trackErrors: true,
    // 资源采样率
    sampleRate: 0.1,
  },
} as const;
