import { QueryClient } from '@tanstack/solid-query';

export const AppQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
