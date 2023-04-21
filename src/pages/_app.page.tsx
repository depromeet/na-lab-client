import { type ReactElement, type ReactNode, useEffect, useState } from 'react';
import { type NextPage } from 'next';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ThemeProvider } from '@emotion/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { domMax, LazyMotion } from 'framer-motion';
import mixpanel from 'mixpanel-browser';
import { hotjar } from 'react-hotjar';

import GlobalStyles from '~/styles/GlobalStyle';
import theme from '~/styles/theme';
import { isProd } from '~/utils/common';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const HJID = process.env.NEXT_PUBLIC_HOTJAR_ID;
const HJSV = process.env.NEXT_PUBLIC_HOTJAR_SV;
const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    if (isProd(process.env.NODE_ENV)) {
      hotjar.initialize(Number(HJID), Number(HJSV));
    }
  }, []);

  useEffect(() => {
    if (isProd(process.env.NODE_ENV)) {
      mixpanel.init(MIXPANEL_ID ?? '', { debug: true });
    }
  }, []);

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
    <>
      {isProd(process.env.NODE_ENV) && (
        <>
          {/* Google Analytics */}
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
        `,
            }}
          />
        </>
      )}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <LazyMotion features={domMax}>
              <GlobalStyles />
              {getLayout(<Component {...pageProps} />)}
            </LazyMotion>
          </ThemeProvider>
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
