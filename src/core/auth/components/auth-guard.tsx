import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/use-auth';

export interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  roles?: string[];
}

export function AuthGuard({
  children,
  fallback,
  redirectTo = '/auth/signin',
  roles = [],
}: AuthGuardProps) {
  const router = useRouter();
  const { session, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (roles.length > 0 && session?.user?.role) {
      const hasRequiredRole = roles.includes(session.user.role);
      if (!hasRequiredRole) {
        router.push('/403');
      }
    }
  }, [isLoading, isAuthenticated, session, roles, router, redirectTo]);

  if (isLoading || !isAuthenticated) {
    return fallback || null;
  }

  if (roles.length > 0 && session?.user?.role) {
    const hasRequiredRole = roles.includes(session.user.role);
    if (!hasRequiredRole) {
      return null;
    }
  }

  return <>{children}</>;
}
