import { css, type Theme } from '@emotion/react';

export const fixedBottomCss = (theme: Theme) => css`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 16px;
  bottom: 12px;
  width: 100%;
  max-width: ${theme.size.maxWidth};
`;
