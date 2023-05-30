/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 결단력_있는 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <circle cx="10" cy="10" r="5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
      />
    </Svg>
  );
};
