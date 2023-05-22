import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const CheckIcon = ({ width = 18, height = 12, ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg width={width} height={height} isUsingFill {...rest}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.0001 1.00008C17.3906 1.3906 17.3906 2.02376 17.0001 2.41429L7.70718 11.7072C7.31666 12.0977 6.68349 12.0977 6.29297 11.7072L1.00008 6.41429C0.609551 6.02376 0.609551 5.3906 1.00008 5.00008C1.3906 4.60955 2.02377 4.60955 2.41429 5.00008L7.00008 9.58586L15.5859 1.00008C15.9764 0.609551 16.6096 0.609551 17.0001 1.00008Z"
        fill="#638FFF"
      />
    </Svg>
  );
};

export default CheckIcon;
