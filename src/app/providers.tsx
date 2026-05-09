'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, type ReactNode } from 'react';
import { useAppStore } from '@/store/useAppStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const initFromStorage = useAppStore((s) => s.initFromStorage);

  useEffect(() => {
    initFromStorage(); // Rehydrate auth state from localStorage on mount
  }, [initFromStorage]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
