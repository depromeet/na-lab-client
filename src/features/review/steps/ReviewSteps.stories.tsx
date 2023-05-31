import { useState } from 'react';
import { css } from '@emotion/react';

import { type Softskills } from '~/components/graphic/softskills/type';

import Cowork from './Cowork';
import Intro from './Intro';
import QuestionIntro from './QuestionIntro';
import Softskill from './Softskill';

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

export function 질문_인트로() {
  return (
    <main css={mainCss}>
      <QuestionIntro />
    </main>
  );
}

export function 소프트_스킬() {
  const [selectedSoftskills, setSelectedSoftskills] = useState<Softskills[]>([]);

  return (
    <main css={mainCss}>
      <Softskill selectedSoftskills={selectedSoftskills} setSelectedSoftskills={setSelectedSoftskills} />
    </main>
  );
}
