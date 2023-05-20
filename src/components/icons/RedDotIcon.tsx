import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const RedDotIcon = ({ size = 10, ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} {...rest}>
      <circle cx="5" cy="5" r="5" fill="#F85B81" />
    </Svg>
  );
};

export default RedDotIcon;
