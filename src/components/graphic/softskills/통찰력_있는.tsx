/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 통찰력_있는 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM14.971 5.08292C14.9827 5.04944 14.9505 5.01727 14.9171 5.02897C11.7333 6.14159 8.26624 6.14159 5.08244 5.02897C5.04896 5.01727 5.0168 5.04944 5.0285 5.08292C6.14111 8.26672 6.14111 11.7337 5.0285 14.9175C5.0168 14.951 5.04896 14.9832 5.08244 14.9715C8.26624 13.8589 11.7333 13.8589 14.9171 14.9715C14.9505 14.9832 14.9827 14.951 14.971 14.9175C13.8584 11.7337 13.8584 8.26672 14.971 5.08292Z"
      />
    </Svg>
  );
};
