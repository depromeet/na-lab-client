/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 적응력_좋은 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <circle cx="5" cy="5" r="5" />
      <circle cx="15" cy="5" r="5" />
      <circle cx="5" cy="15" r="5" />
      <circle cx="15" cy="15" r="5" />
    </Svg>
  );
};
