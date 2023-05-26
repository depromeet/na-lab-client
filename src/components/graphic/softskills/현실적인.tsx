/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 현실적인 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <rect x="0.974609" y="1" width="18" height="4" rx="0.5" />
      <rect x="0.974609" y="8" width="18" height="4" rx="0.5" />
      <rect x="0.974609" y="15" width="18" height="4" rx="0.5" />
    </Svg>
  );
};
