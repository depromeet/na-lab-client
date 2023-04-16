import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

const globalStyles = css`
  ${emotionNormalize}

  * {
    box-sizing: border-box !important;
    margin: 0;
    padding: 0;

    font-family: inherit;
    word-break: keep-all;
    word-wrap: break-word;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyles;
