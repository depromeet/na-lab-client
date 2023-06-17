import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const HomeIcon = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg color={color} isUsingFill>
      <path d="M14 16.0006H10V22.0006H3C2.44772 22.0006 2 21.5529 2 21.0006V10.4812C2 10.1775 2.13809 9.89015 2.3753 9.70038L11.3753 2.50038C11.7405 2.20821 12.2595 2.20821 12.6247 2.50038L21.6247 9.70038C21.8619 9.89015 22 10.1775 22 10.4812V21.0006C22 21.5529 21.5523 22.0006 21 22.0006H14V16.0006Z" />
    </Svg>
  );
};

export default HomeIcon;
