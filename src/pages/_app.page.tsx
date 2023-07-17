import { useState } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { css, type Theme, ThemeProvider } from '@emotion/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { domMax, LazyMotion } from 'framer-motion';

import AuthProvider from '~/components/auth/AuthProvider';
import ErrorBoundary from '~/components/error/ErrorBoundary';
import MonitoringInitializer from '~/components/monitoring/MonitoringInitializer';
import NewFeedbackSnackBarListener from '~/components/snackBar/NewFeedbackSnackBarListener';
import SnackBarWrapper from '~/components/snackBar/SnackBarWrapper';
import ToastWrapper from '~/components/toast/ToastWrapper';
import { MAIN_LAYOUT_ID } from '~/constants/name';
import usePageTrack from '~/hooks/event/usePageTrack';
import GlobalStyles from '~/styles/GlobalStyle';
import defaultTheme from '~/styles/theme';
import { type NextPageWithLayout } from '~/types/page';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <SessionProvider session={pageProps.session}>
      <MonitoringInitializer />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={defaultTheme}>
            <LazyMotion features={domMax}>
              <GlobalStyles />
              <ErrorBoundary>
                <AuthProvider>
                  <PageViewTracker />
                  <div id={MAIN_LAYOUT_ID} css={defaultLayoutCss}>
                    {getLayout(<Component {...pageProps} />)}
                    <NewFeedbackSnackBarListener />
                    <ToastWrapper />
                    <SnackBarWrapper />
                  </div>
                </AuthProvider>
              </ErrorBoundary>
            </LazyMotion>
          </ThemeProvider>
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

const defaultLayoutCss = (theme: Theme) => css`
  width: 100%;
  max-width: ${theme.size.maxWidth};
  min-height: 100dvh;
  margin: 0 auto;
  padding: 0 16px;
`;

const PageViewTracker = () => {
  usePageTrack();

  return null;
};
