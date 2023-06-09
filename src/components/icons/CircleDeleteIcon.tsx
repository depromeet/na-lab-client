import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

const CircleDeleteIcon = ({ size = 24, color = '#F85B81', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} {...rest}>
      <rect width="24" height="24" rx="12" fill={color} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5312 16.4701C15.7915 16.7305 16.2137 16.7305 16.474 16.4701C16.7344 16.2098 16.7344 15.7876 16.474 15.5273L12.9454 11.9987L16.474 8.4701C16.7344 8.20975 16.7344 7.78764 16.474 7.52729C16.2137 7.26694 15.7915 7.26694 15.5312 7.52729L12.0026 11.0559L8.47401 7.52729C8.21366 7.26694 7.79155 7.26694 7.5312 7.52729C7.27085 7.78764 7.27085 8.20975 7.5312 8.4701L11.0598 11.9987L7.5312 15.5273C7.27085 15.7876 7.27085 16.2098 7.5312 16.4701C7.79155 16.7305 8.21366 16.7305 8.47401 16.4701L12.0026 12.9415L15.5312 16.4701Z"
        fill="white"
      />
    </Svg>
  );
};

export default CircleDeleteIcon;
