import { type ReactElement, useEffect } from 'react';
import { hotjar } from 'react-hotjar';

import { isProd } from '~/utils/common';

const HJID = process.env.NEXT_PUBLIC_HOTJAR_ID;
const HJSV = process.env.NEXT_PUBLIC_HOTJAR_SV;

const HotjarProvider = ({ children }: { children: ReactElement }) => {
  useEffect(() => {
    if (isProd(process.env.NODE_ENV)) hotjar.initialize(Number(HJID), Number(HJSV));
  }, []);

  return <>{children}</>;
};

export default HotjarProvider;
