import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const RedDotIcon = ({ ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg isUsingFill {...rest}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="5" fill="#F85B81" />
      </svg>
    </Svg>
  );
};

export default RedDotIcon;
