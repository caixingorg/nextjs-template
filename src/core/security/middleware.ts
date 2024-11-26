import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SECURITY_CONFIG } from './config';

export function securityMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set security headers
  const headers = response.headers;

  // Content Security Policy
  if (SECURITY_CONFIG.headers.contentSecurityPolicy.enabled) {
    headers.set(
      'Content-Security-Policy',
      SECURITY_CONFIG.headers.contentSecurityPolicy.value
    );
  }

  // Strict Transport Security
  if (SECURITY_CONFIG.headers.strictTransportSecurity.enabled) {
    headers.set(
      'Strict-Transport-Security',
      SECURITY_CONFIG.headers.strictTransportSecurity.value
    );
  }

  // X-Content-Type-Options
  headers.set('X-Content-Type-Options', 'nosniff');

  // X-Frame-Options
  headers.set('X-Frame-Options', 'DENY');

  // X-XSS-Protection
  headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer-Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions-Policy
  if (SECURITY_CONFIG.headers.permissionsPolicy.enabled) {
    headers.set(
      'Permissions-Policy',
      SECURITY_CONFIG.headers.permissionsPolicy.value
    );
  }

  return response;
}

export function isSecureContext(request: NextRequest): boolean {
  return request.url.startsWith('https://') || request.url.includes('localhost');
}
