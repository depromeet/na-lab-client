/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 창의적인 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <rect x="12" y="0.989258" width="18" height="4" rx="0.5" transform="rotate(90 12 0.989258)" />
      <rect x="19" y="11.9897" width="18" height="4" rx="0.5" transform="rotate(-180 19 11.9897)" />
      <rect x="2.22266" y="14.9395" width="18" height="4" rx="0.5" transform="rotate(-45 2.22266 14.9395)" />
      <rect x="5.05078" y="2.21143" width="18" height="4" rx="0.5" transform="rotate(45 5.05078 2.21143)" />
    </Svg>
  );
};
