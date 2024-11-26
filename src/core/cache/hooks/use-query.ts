import { useQuery as useReactQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useQuery<TData = unknown, TError = AxiosError>(
  key: string | readonly unknown[],
  fetcher: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: fetcher,
    ...options,
  });
}
