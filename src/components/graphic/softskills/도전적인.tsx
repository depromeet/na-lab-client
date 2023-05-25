/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 도전적인 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <circle cx="7.02148" cy="2.99951" r="2" />
      <rect x="1.02148" y="9.99951" width="6" height="4" />
      <rect x="7.02148" y="9.99951" width="9" height="4" transform="rotate(90 7.02148 9.99951)" />
      <rect x="7.02148" y="5.99951" width="6" height="4" />
      <rect x="13.0215" y="6.99951" width="12" height="4" transform="rotate(90 13.0215 6.99951)" />
      <rect x="13.0215" y="1.99951" width="6" height="4" />
      <rect x="19.0215" y="4.99951" width="14" height="4" transform="rotate(90 19.0215 4.99951)" />
    </Svg>
  );
};
