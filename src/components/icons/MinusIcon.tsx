import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

const MinusIcon = ({ width = 14, height = 2, color = '#394258', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg width={width} height={height} isUsingFill {...rest}>
      <path
        d="M0.333984 0.999349C0.333984 0.539112 0.70708 0.166016 1.16732 0.166016H12.834C13.2942 0.166016 13.6673 0.539112 13.6673 0.999349V0.999349C13.6673 1.45959 13.2942 1.83268 12.834 1.83268H1.16732C0.70708 1.83268 0.333984 1.45959 0.333984 0.999349V0.999349Z"
        fill={color}
      />
    </Svg>
  );
};

export default MinusIcon;
