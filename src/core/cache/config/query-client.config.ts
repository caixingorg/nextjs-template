import { QueryClient } from '@tanstack/react-query';

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 3,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);
