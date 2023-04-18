import { css } from '@emotion/react';

export default function Home() {
  return <h1 css={h1}>home</h1>;
}

const h1 = css`
  padding: 20px;
  color: red;
`;
