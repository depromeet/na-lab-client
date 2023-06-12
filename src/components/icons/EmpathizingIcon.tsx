import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const EmpathizingIcon = ({ size = 28, color = '#677089', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.2004 18.2004C22.8396 18.2004 26.6004 14.4396 26.6004 9.80039C26.6004 5.1612 22.8396 1.40039 18.2004 1.40039C13.5612 1.40039 9.80039 5.1612 9.80039 9.80039C5.1612 9.80039 1.40039 13.5612 1.40039 18.2004C1.40039 22.8396 5.1612 26.6004 9.80039 26.6004C14.4396 26.6004 18.2004 22.8396 18.2004 18.2004ZM18.2004 18.2004C13.5612 18.2004 9.80039 14.4396 9.80039 9.80039C14.4396 9.80039 18.2004 13.5612 18.2004 18.2004Z"
        fill={color}
      />
    </Svg>
  );
};

export default EmpathizingIcon;
