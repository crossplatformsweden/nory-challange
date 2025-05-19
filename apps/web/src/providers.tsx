'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, useEffect } from 'react';
import { getNoryInventoryAPIMock } from '@nory/api-client';

async function initMocks() {
  // eslint-disable-next-line no-constant-condition
  if (true) {
    const { setupWorker } = await import('msw/browser');
    const handlers = getNoryInventoryAPIMock();
    const worker = setupWorker();

    worker.events.on('unhandledException', (error) => {
      console.error('Unhandled MSW error:', error);
    });

    // Start the worker and wait for it to be ready
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });

    // @ts-ignore - MSW v2 type mismatch between packages
    worker.use(...handlers);
  }
}

export function Providers({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initMocks();
      setIsReady(true);
    };
    init();
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  if (!isReady) {
    return null; // or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
