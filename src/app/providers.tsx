import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { queryClient } from '@/lib/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { indexedDbPersister } from '@/lib/query-persister';

const PERSIST_MAX_AGE = 1000 * 60 * 60 * 24; // 24 jam

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: indexedDbPersister,
        maxAge: PERSIST_MAX_AGE,
      }}>
      {children}
      <Toaster position="top-right" richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
