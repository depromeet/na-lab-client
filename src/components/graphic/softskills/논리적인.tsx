/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 논리적인 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <rect x="7" y="7" width="6" height="6" rx="0.5" />
      <rect x="1" y="1" width="6" height="6" rx="0.5" />
      <rect x="13" y="1" width="6" height="6" rx="0.5" />
      <rect x="1" y="13" width="6" height="6" rx="0.5" />
      <rect x="13" y="13" width="6" height="6" rx="0.5" />
    </Svg>
  );
};
