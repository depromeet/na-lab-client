import { useState } from 'react';
import { css } from '@emotion/react';

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

const MOCK_NICKNAME = '오혜성';

export function 인트로() {
  return (
    <main css={mainCss}>
      <Intro nickname={MOCK_NICKNAME} />
    </main>
  );
}

export function 협업_경험() {
  const [isCoworked, setIsCoworked] = useState<null | boolean>(null);

  return (
    <main css={mainCss}>
      <Cowork nickname={MOCK_NICKNAME} isCoworked={isCoworked} setIsCoworked={setIsCoworked} />
    </main>
  );
}

export function 질문_인트로() {
  return (
    <main css={mainCss}>
      <QuestionIntro nickname={MOCK_NICKNAME} />
    </main>
  );
}

const MOCK_SOFTSKILLS = [
  { content: '개성이_뚜렷한', order: 0, choice_id: '456335196640616530' },
  { content: '결단력_있는', order: 1, choice_id: '456335196640616531' },
];

export function 소프트_스킬() {
  const [selectedSoftskills, setSelectedSoftskills] = useState<string[]>([]);

  return (
    <main css={mainCss}>
      <Softskill
        nickname={MOCK_NICKNAME}
        choices={MOCK_SOFTSKILLS}
        selectedChoiceIds={selectedSoftskills}
        setChoices={setSelectedSoftskills}
      />
    </main>
  );
}
