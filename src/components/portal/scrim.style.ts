import { css } from '@emotion/react';

export const scrimCss = css`
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100%;
  /* TODO: 디자인에 따라 변경 필요 */
  background-color: rgba(0, 0, 0, 0.3);

  overflow: hidden;
`;
