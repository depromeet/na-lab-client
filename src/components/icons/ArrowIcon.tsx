import { type ComponentProps } from 'react';
import { css } from '@emotion/react';

import Svg from '../svg/Svg';
import { type Direction, DIRECTION_DEGREE } from './type';

interface Props extends ComponentProps<typeof Svg> {
  /**
   * @default 'left'
   */
  direction?: Direction;
}

const ArrowIcon = ({ direction = 'left', color = '#3D4350', ...rest }: Props) => {
  return (
    <Svg color={color} isUsingFill css={directionCss(direction)} {...rest}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.7071 4.29289C11.0976 4.68342 11.0976 5.31658 10.7071 5.70711L5.41421 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H5.41421L10.7071 18.2929C11.0976 18.6834 11.0976 19.3166 10.7071 19.7071C10.3166 20.0976 9.68342 20.0976 9.29289 19.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L9.29289 4.29289C9.68342 3.90237 10.3166 3.90237 10.7071 4.29289Z"
      />
    </Svg>
  );
};

export default ArrowIcon;

const directionCss = (direction: Direction) => css`
  transform: rotate(${DIRECTION_DEGREE[direction]}deg);
`;
