/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 계획적인 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path d="M1 12.5C1 12.2239 1.22386 12 1.5 12H19V18.5C19 18.7761 18.7761 19 18.5 19H1.5C1.22386 19 1 18.7761 1 18.5V12.5Z" />
      <path d="M6 6.5C6 6.22386 6.22386 6 6.5 6H19V12H6V6.5Z" />
      <path d="M11 1.5C11 1.22386 11.2239 1 11.5 1H18.5C18.7761 1 19 1.22386 19 1.5V6H11V1.5Z" />
    </Svg>
  );
};
