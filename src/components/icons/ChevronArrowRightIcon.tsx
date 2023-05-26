import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const ChevronArrowRightIcon = ({ width = 8, height = 14, color = 'black', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg width={width} height={height} {...rest}>
      <path d="M1 13L7 7L1 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default ChevronArrowRightIcon;
