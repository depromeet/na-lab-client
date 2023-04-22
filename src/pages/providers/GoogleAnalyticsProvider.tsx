import { type ReactElement } from 'react';
import Script from 'next/script';

import { isProd } from '~/utils/common';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

const GoogleAnalyticsProvider = ({ children }: { children: ReactElement }) => {
  return (
    <>
      {isProd(process.env.NODE_ENV) && (
        <>
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
      {children}
    </>
  );
};

export default GoogleAnalyticsProvider;
