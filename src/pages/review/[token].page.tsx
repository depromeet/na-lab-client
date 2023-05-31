import { useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';

import { type Softskills } from '~/components/graphic/softskills/type';
import ChoiceQuestion from '~/features/review/steps/ChoiceQuestion';
import Intro from '~/features/review/steps/Intro';
import Last from '~/features/review/steps/Last';
import Position from '~/features/review/steps/Position';
import useInjectedElementStep from '~/hooks/step/useInjectedElementStep';

const Cowork = dynamic(() => import('~/features/review/steps/Cowork'), { ssr: false });
const Softskill = dynamic(() => import('~/features/review/steps/Softskill'), { ssr: false });
const ShortQuestion = dynamic(() => import('~/features/review/steps/ShortQuestion'), { ssr: false });
const QuestionIntro = dynamic(() => import('~/features/review/steps/QuestionIntro'), { ssr: false });

const MOCK_CHOICES = [
  { choice_id: 1, content: 'UX' },
  { choice_id: 2, content: 'UI' },
  { choice_id: 3, content: 'GUI' },
  { choice_id: 4, content: 'BX' },
];

const ReviewPage = () => {
  // TODO: 이후 token 검증 및 조회 로직 추가
  // const router = useRouter();
  // const { token } = router.query;

  const { isCoworked, setIsCoworked } = useIsCowork();
  const { selectedSoftskills, setSelectedSoftskills } = useSoftskills();
  const { setStrength } = useStrength();

  const { currentElement } = useInjectedElementStep({
    elements: [
      <Position key="position" />,
      <Intro key="intro" />,
      <Cowork key="cowork" isCoworked={isCoworked} setIsCoworked={setIsCoworked} />,
      <QuestionIntro key="question-intro" />,
      <Softskill
        key="softskill"
        selectedSoftskills={selectedSoftskills}
        setSelectedSoftskills={setSelectedSoftskills}
      />,
      <ShortQuestion
        key="strength"
        headerTitle="협업을 하면서 느꼈던 예진님만의 장점이 있나요?"
        setReplies={setStrength}
        startMessages={[
          { timing: 1000, text: '협업을 한 적이 없다면 일상에서 드러나는 성격이나 행동에 대한 장점을 적어주세요.' },
          { timing: 2000, text: '답변을 적어 저에게 메세지를 보내주시면, 익명으로 전달할게요!' },
        ]}
        afterUserMessages={[{ timing: 1000, text: '못한 말이 있다면 더 보낼 수 있어요.' }]}
      />,
      <ChoiceQuestion
        key="choice"
        title="저는 UX, UI, GUI 중에 어떤 분야에 더 강점이 있나요?"
        choices={MOCK_CHOICES}
        max_selectable_count={1}
      />,
      <ChoiceQuestion
        key="multi choice"
        title="저는 UX, UI, GUI 중에 어떤 분야에 더 강점이 있나요?"
        choices={MOCK_CHOICES}
        max_selectable_count={2}
      />,
      <Last key="last" onSubmit={() => console.warn('submit')} />,
    ],
  });

  return (
    <main css={mainCss}>
      <AnimatePresence mode="wait">{currentElement}</AnimatePresence>
    </main>
  );
};

export default ReviewPage;

const mainCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const useIsCowork = () => {
  const [isCoworked, setIsCoworked] = useState<null | boolean>(null);

  return { isCoworked, setIsCoworked };
};

const useSoftskills = () => {
  const [selectedSoftskills, setSelectedSoftskills] = useState<Softskills[]>([]);

  return { selectedSoftskills, setSelectedSoftskills };
};

const useStrength = () => {
  const [strength, setStrength] = useState<string[]>([]);

  return { strength, setStrength };
};
