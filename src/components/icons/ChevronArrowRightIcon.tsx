import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const ChevronArrowRightIcon = ({ ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg isUsingFill {...rest}>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 13L7 7L1 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </Svg>
  );
};

export default ChevronArrowRightIcon;
