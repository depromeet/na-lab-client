import { useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import * as ChannelTalk from '@channel.io/channel-web-sdk-loader';
import { css, type Theme, ThemeProvider } from '@emotion/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { domMax, LazyMotion } from 'framer-motion';
import { useOpenExternalBrowser } from 'open-external-browser';

import AuthProvider from '~/components/auth/AuthProvider';
import ErrorBoundary from '~/components/error/ErrorBoundary';
import MonitoringInitializer from '~/components/monitoring/MonitoringInitializer';
import NewFeedbackSnackBarListener from '~/components/snackBar/NewFeedbackSnackBarListener';
import SnackBarWrapper from '~/components/snackBar/SnackBarWrapper';
import ToastWrapper from '~/components/toast/ToastWrapper';
import { MAIN_LAYOUT_ID } from '~/constants/name';
import useChannelTalkButtonVisiblity from '~/hooks/channelTalk/useChannelTalkButtonVisibility';
import usePageTrack from '~/hooks/event/usePageTrack';
import GlobalStyles from '~/styles/GlobalStyle';
import defaultTheme from '~/styles/theme';
import { type NextPageWithLayout } from '~/types/page';
import { isProd } from '~/utils/common';

ChannelTalk.loadScript();
ChannelTalk.boot({
  pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY,
});

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
            retry: isProd(process.env.NODE_ENV) ? 3 : false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const router = useRouter();
  useOpenExternalBrowser({ where: 'all', onOpen: () => router.push('/') });

  useChannelTalkButtonVisiblity();

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
                    <Analytics />
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
