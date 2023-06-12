import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

const ListIcon = ({ width = 28, height = 24, color = '#CDE7AC', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg width={width} height={height} {...rest}>
      <rect y="0.5625" width="28" height="11" rx="1.5" fill={color} />
      <rect y="13.4375" width="28" height="10" rx="1.5" fill={color} />
      <circle cx="22" cy="6.0625" r="2" fill="#EBF7DA" />
    </Svg>
  );
};

export default ListIcon;
