import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const BottomSheetHandleIcon = ({ width = 63, height = 4, ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg width={width} height={height} {...rest}>
      <rect x="0.5" width="62" height="4" rx="2" fill="#E4E7EE" />
    </Svg>
  );
};

export default BottomSheetHandleIcon;
