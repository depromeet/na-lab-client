/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 꼼꼼한 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <circle cx="15" cy="15" r="5" />
      <circle cx="5" cy="5" r="5" />
      <rect x="11" width="9" height="9" rx="1" />
      <rect y="11" width="9" height="9" rx="1" />
    </Svg>
  );
};
