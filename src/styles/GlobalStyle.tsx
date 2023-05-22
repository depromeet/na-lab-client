import { css, Global } from '@emotion/react';

const globalStyles = css`
  * {
    all: unset;

    box-sizing: border-box !important;
    margin: 0;
    padding: 0;

    font-family: inherit;
    word-break: keep-all;
    word-wrap: break-word;
  }

  a {
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }
`;

const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyles;
