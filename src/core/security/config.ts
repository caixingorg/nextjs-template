export const SECURITY_CONFIG = {
  headers: {
    contentSecurityPolicy: {
      enabled: true,
      value: [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self' https:",
        "media-src 'self'",
        "object-src 'none'",
        "frame-src 'self'",
        "worker-src 'self' blob:",
      ].join('; '),
    },
    strictTransportSecurity: {
      enabled: true,
      value: 'max-age=31536000; includeSubDomains',
    },
    permissionsPolicy: {
      enabled: true,
      value: [
        'camera=()',
        'microphone=()',
        'geolocation=()',
        'interest-cohort=()',
        'payment=()',
        'usb=()',
      ].join(', '),
    },
  },
  // CORS configuration
  cors: {
    enabled: true,
    options: {
      allowedOrigins: ['*'],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Length', 'X-Request-Id'],
      maxAge: 86400,
      credentials: true,
    },
  },
  // Rate limiting configuration
  rateLimit: {
    enabled: true,
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  },
  // Content validation
  validation: {
    sanitize: true,
    validateInput: true,
    maxRequestSize: '1mb',
  },
} as const;

export type SecurityConfig = typeof SECURITY_CONFIG;
