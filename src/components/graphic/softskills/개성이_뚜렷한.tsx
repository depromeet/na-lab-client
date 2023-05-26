/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 개성이_뚜렷한 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.56926 11.4382C9.76883 11.7147 10.1806 11.7147 10.3801 11.4382L18.0629 0.792605C18.3016 0.461923 18.0653 0 17.6575 0H2.2919C1.8841 0 1.64781 0.461921 1.88646 0.792603L9.56926 11.4382ZM9.9747 20C12.1838 20 13.9747 18.2091 13.9747 16C13.9747 13.7909 12.1838 12 9.9747 12C7.76556 12 5.9747 13.7909 5.9747 16C5.9747 18.2091 7.76556 20 9.9747 20Z"
      />
    </Svg>
  );
};
