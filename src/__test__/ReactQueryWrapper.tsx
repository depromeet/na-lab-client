/* eslint-disable @typescript-eslint/no-empty-function */
import { type PropsWithChildren, type ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ReactQueryWrapper = ({ children }: PropsWithChildren): ReactElement => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      // eslint-disable-next-line no-console
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryWrapper;
