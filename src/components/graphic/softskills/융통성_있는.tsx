/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 융통성_있는 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.75487 1.85355C1.43989 1.53857 1.66297 1 2.10843 1H17.8221C18.2675 1 18.4906 1.53857 18.1756 1.85355L10.3188 9.71039C10.1235 9.90565 9.80697 9.90565 9.6117 9.71039L1.75487 1.85355ZM1.78805 18.1465C1.47307 18.4614 1.69616 19 2.14161 19H17.8553C18.3007 19 18.5238 18.4614 18.2088 18.1465L10.352 10.2896C10.1567 10.0944 9.84015 10.0944 9.64489 10.2896L1.78805 18.1465Z"
      />
    </Svg>
  );
};
