import { useState } from 'react';
import { css } from '@emotion/react';

import Cowork from './Cowork';
import Intro from './Intro';

const meta = {
  title: 'Review Steps',
};

export default meta;

const mainCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export function 인트로() {
  return (
    <main css={mainCss}>
      <Intro />
    </main>
  );
}

export function 협업_경험() {
  const [isCoworked, setIsCoworked] = useState<null | boolean>(null);

  return (
    <main css={mainCss}>
      <Cowork isCoworked={isCoworked} setIsCoworked={setIsCoworked} />
    </main>
  );
}
