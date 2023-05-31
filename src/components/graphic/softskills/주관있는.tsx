/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 주관있는 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3588 0.363732C10.1636 0.16847 9.847 0.16847 9.65174 0.363732L0.359337 9.65614C0.164075 9.8514 0.164075 10.168 0.359337 10.3632L9.65174 19.6556C9.847 19.8509 10.1636 19.8509 10.3588 19.6556L19.6513 10.3632C19.8465 10.168 19.8465 9.8514 19.6513 9.65614L10.3588 0.363732ZM10.0053 15.0102C12.7667 15.0102 15.0053 12.7716 15.0053 10.0102C15.0053 7.24875 12.7667 5.01018 10.0053 5.01018C7.24387 5.01018 5.00529 7.24875 5.00529 10.0102C5.00529 12.7716 7.24387 15.0102 10.0053 15.0102Z"
      />
      <rect x="7.00586" y="7.01025" width="6" height="6" rx="0.5" />
    </Svg>
  );
};
