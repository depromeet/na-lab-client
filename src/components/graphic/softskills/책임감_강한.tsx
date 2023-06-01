/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 책임감_강한 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path d="M1.01953 6.37871C1.01953 6.03232 1.58463 5.86841 1.89118 6.12588L9.64789 12.6407C9.84651 12.8075 10.1926 12.8075 10.3912 12.6407L18.1479 6.12588C18.4544 5.86841 19.0195 6.03233 19.0195 6.37871V18.622C19.0195 18.8308 18.7957 19 18.5195 19H1.51953C1.24339 19 1.01953 18.8308 1.01953 18.622V6.37871Z" />
      <circle cx="10.0195" cy="5" r="4" />
    </Svg>
  );
};
