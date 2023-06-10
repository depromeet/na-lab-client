import { css, type Theme } from '@emotion/react';

import Spinner from './Spinner';

const FixedSpinner = () => {
  return (
    <div css={wrapperCss}>
      <Spinner />
    </div>
  );
};

export default FixedSpinner;

const wrapperCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.aboveFixed};
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: ${theme.colors.white};
`;
