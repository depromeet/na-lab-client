/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 공감_능력이_좋은 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 13C16.3137 13 19 10.3137 19 7C19 3.68629 16.3137 1 13 1C9.68629 1 7 3.68629 7 7C3.68629 7 1 9.68629 1 13C1 16.3137 3.68629 19 7 19C10.3137 19 13 16.3137 13 13ZM7 7C10.3137 7 13 9.68629 13 13C9.68629 13 7 10.3137 7 7Z"
      />
    </Svg>
  );
};
