import { css } from '@emotion/react';

export default function Home() {
  return <h1 css={h1}>home</h1>;
}

const h1 = css`
  /* NOTE: 순서 바꾸면 경고 뜨는 모습을 볼 수 있어요 > 저장하면 자동으로 정렬됩니다 */
  padding: 20px;
  color: red;
`;
