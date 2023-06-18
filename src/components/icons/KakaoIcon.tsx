import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

const KakaoIcon = ({ color = '#371C1D', width = 21, height = 20, ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg width={width} height={height} {...rest}>
      <path
        d="M10.5 0C4.70081 0 0 3.69266 0 8.25035C0 11.2159 1.99056 13.815 4.98036 15.2692C4.76029 16.083 4.18533 18.2209 4.07034 18.6781C3.92759 19.2456 4.27851 19.2377 4.51048 19.086C4.6909 18.9658 7.38727 17.1431 8.55108 16.3569C9.18353 16.4495 9.83384 16.4987 10.5 16.4987C16.2992 16.4987 21 12.8061 21 8.24838C21 3.69266 16.2992 0 10.5 0Z"
        fill={color}
      />
    </Svg>
  );
};

export default KakaoIcon;
