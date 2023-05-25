import { forwardRef, type HTMLAttributes, type Ref } from 'react';
import { css, type Interpolation, type Theme } from '@emotion/react';

import { BODY_1, HEAD_2_REGULAR } from '~/styles/typo';

type Size = 'large' | 'medium';
type Color = 'default' | 'bluegreen' | 'pink' | 'skyblue' | 'yellowgreen' | 'purple';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  size?: Size;
  color?: Color;
}

const Pill = forwardRef(function Pill(
  { size = 'medium', color = 'default', children, ...rest }: Props,
  forwardedRef: Ref<HTMLSpanElement>,
) {
  return (
    <span css={[spanCss, SIZE_STYLE[size], COLOR_STYLE[color]]} ref={forwardedRef} {...rest}>
      {children}
    </span>
  );
});

export default Pill;

const SIZE_STYLE: Record<Size, Interpolation<Theme>> = {
  medium: BODY_1,
  large: HEAD_2_REGULAR,
};

const defaultCss = css`
  background-color: #f4f5f9;
`;

const bluegreenCss = (theme: Theme) => css`
  background-color: ${theme.colors.bluegreen};

  & > svg {
    fill: #b9ded2;
  }
`;

const pinkCss = (theme: Theme) => css`
  background-color: ${theme.colors.pink};

  & > svg {
    fill: #e5bfef;
  }
`;

const skyblueCss = (theme: Theme) => css`
  background-color: ${theme.colors.skyblue};

  & > svg {
    fill: #bfdbf6;
  }
`;

const yellowgreenCss = (theme: Theme) => css`
  background-color: ${theme.colors.yellowgreen};

  & > svg {
    fill: #cde7ac;
  }
`;

const purpleCss = (theme: Theme) => css`
  background-color: ${theme.colors.purple};

  & > svg {
    fill: #d3c3f4;
  }
`;

const COLOR_STYLE: Record<Color, Interpolation<Theme>> = {
  default: defaultCss,
  bluegreen: bluegreenCss,
  pink: pinkCss,
  skyblue: skyblueCss,
  yellowgreen: yellowgreenCss,
  purple: purpleCss,
};

const spanCss = (theme: Theme) => css`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;

  width: fit-content;
  padding: 10px 12px;

  color: ${theme.colors.gray_500};

  border-radius: 24px;
`;
