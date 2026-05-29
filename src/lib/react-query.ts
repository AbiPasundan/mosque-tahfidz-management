import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      gcTime: 1000 * 60 * 60 * 24, // 24 jam — match dengan maxAge persister
    },
  },
});

queryClient.setQueryDefaults(['me'], {
  gcTime: 0,
});
