import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';

export interface UseAuthOptions {
  redirectTo?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { data: session, status, update } = useSession();

  const login = useCallback(
    async (provider: string, credentials?: Record<string, any>) => {
      try {
        const result = await signIn(provider, {
          ...credentials,
          redirect: false,
          callbackUrl: options.redirectTo,
        });

        if (result?.error) {
          options.onError?.(new Error(result.error));
          return false;
        }

        options.onSuccess?.();
        return true;
      } catch (error) {
        options.onError?.(error as Error);
        return false;
      }
    },
    [options]
  );

  const logout = useCallback(async () => {
    try {
      await signOut({ redirect: false });
      options.onSuccess?.();
      return true;
    } catch (error) {
      options.onError?.(error as Error);
      return false;
    }
  }, [options]);

  const updateSession = useCallback(async () => {
    try {
      await update();
      return true;
    } catch (error) {
      options.onError?.(error as Error);
      return false;
    }
  }, [update, options]);

  return {
    session,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    login,
    logout,
    updateSession,
  };
}
