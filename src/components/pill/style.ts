import { css, type Theme } from '@emotion/react';

export const bluegreenCss = (theme: Theme) => css`
  background-color: ${theme.colors.bluegreen};

  & > svg {
    fill: #b9ded2;
  }
`;

export const pinkCss = (theme: Theme) => css`
  background-color: ${theme.colors.pink};

  & > svg {
    fill: #e5bfef;
  }
`;

export const skyblueCss = (theme: Theme) => css`
  background-color: ${theme.colors.skyblue};

  & > svg {
    fill: #bfdbf6;
  }
`;

export const yellowgreenCss = (theme: Theme) => css`
  background-color: ${theme.colors.yellowgreen};

  & > svg {
    fill: #cde7ac;
  }
`;

export const purpleCss = (theme: Theme) => css`
  background-color: ${theme.colors.purple};

  & > svg {
    fill: #d3c3f4;
  }
`;
