import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const WarningIcon = ({ size = 24, ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} {...rest}>
      <path
        d="M22.5 12C22.5 17.7989 17.7989 22.5 12 22.5C6.20114 22.5 1.5 17.7989 1.5 12C1.5 6.20114 6.20114 1.5 12 1.5C17.7989 1.5 22.5 6.20114 22.5 12Z"
        fill="#F4E0F9"
      />
      <path
        d="M12.0009 15.1413C11.5917 15.1413 11.2135 15.3596 11.0089 15.714C10.8043 16.0684 10.8043 16.5051 11.0089 16.8595C11.2135 17.2139 11.5917 17.4322 12.0009 17.4322C12.6335 17.4322 13.1463 16.9194 13.1463 16.2868C13.1463 15.6542 12.6335 15.1413 12.0009 15.1413ZM12.0009 13.5348C11.5264 13.5348 11.1418 13.1502 11.1418 12.6757V7.90304C11.1418 7.42857 11.5264 7.04395 12.0009 7.04395C12.4754 7.04395 12.86 7.42857 12.86 7.90304V12.6757C12.86 13.1502 12.4754 13.5348 12.0009 13.5348Z"
        fill="#333D4B"
      />
    </Svg>
  );
};

export default WarningIcon;