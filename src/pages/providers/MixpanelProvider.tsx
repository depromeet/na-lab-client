import { type ReactElement, useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

import { isProd } from '~/utils/common';

const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;

const MixpanelProvider = ({ children }: { children: ReactElement }) => {
  useEffect(() => {
    if (isProd(process.env.NODE_ENV)) mixpanel.init(MIXPANEL_ID ?? '', { debug: true });
  }, []);

  return <>{children}</>;
};

export default MixpanelProvider;
