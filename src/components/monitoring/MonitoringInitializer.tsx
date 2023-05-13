import { useEffect } from 'react';
import Script from 'next/script';
import mixpanel from 'mixpanel-browser';
import { hotjar } from 'react-hotjar';

import { isProd } from '~/utils/common';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;
const HJID = process.env.NEXT_PUBLIC_HOTJAR_ID;
const HJSV = process.env.NEXT_PUBLIC_HOTJAR_SV;

const MonitoringInitializer = () => {
  useEffect(() => {
    if (isProd(process.env.NODE_ENV)) {
      mixpanel.init(MIXPANEL_ID ?? '', { debug: true });
      hotjar.initialize(Number(HJID), Number(HJSV));
    }
  }, []);

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
    </>
  );
};

export default MonitoringInitializer;
