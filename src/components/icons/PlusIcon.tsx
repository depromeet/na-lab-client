import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const PlusIcon = ({ size = 24, color = '#638FFF', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} isUsingFill {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5 4C13.5 3.44772 13.0523 3 12.5 3C11.9477 3 11.5 3.44772 11.5 4V11H4.5C3.94772 11 3.5 11.4477 3.5 12C3.5 12.5523 3.94772 13 4.5 13H11.5V20C11.5 20.5523 11.9477 21 12.5 21C13.0523 21 13.5 20.5523 13.5 20V13H20.5C21.0523 13 21.5 12.5523 21.5 12C21.5 11.4477 21.0523 11 20.5 11H13.5V4Z"
        fill={color}
      />
    </Svg>
  );
};

export default PlusIcon;
