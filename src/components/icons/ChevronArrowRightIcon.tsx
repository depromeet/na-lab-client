import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const ChevronArrowRightIcon = ({ width = 8, height = 14, ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg width={width} height={height} {...rest}>
      <path d="M1 13L7 7L1 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
};

export default ChevronArrowRightIcon;
