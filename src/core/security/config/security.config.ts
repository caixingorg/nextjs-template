import helmet from 'helmet';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Helmet 中间件配置
export const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'blob:', 'data:'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
    },
  },
  dnsPrefetchControl: true,
  frameguard: { action: 'sameorigin' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  noSniff: true,
  referrerPolicy: { policy: 'origin-when-cross-origin' },
  xssFilter: true,
};

// Next.js 中间件函数
export function securityMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // 应用 Helmet 配置生成的头
  const helmetInstance = helmet(helmetConfig);
  const headers = helmetInstance.getHeaders();
  
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value as string);
  });
  
  return response;
}
