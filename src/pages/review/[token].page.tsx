import { useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';

import Intro from '~/features/review/steps/Intro';
import ShortQuestion from '~/features/review/steps/ShortQuestion';
import useInjectedElementStep from '~/hooks/step/useInjectedElementStep';

const Cowork = dynamic(() => import('~/features/review/steps/Cowork'), { ssr: false });

const ReviewPage = () => {
  // TODO: 이후 token 검증 및 조회 로직 추가
  // const router = useRouter();
  // const { token } = router.query;

  const { isCoworked, setIsCoworked } = useIsCowork();
  const { setStrength } = useStrength();

  const { currentElement } = useInjectedElementStep({
    elements: [
      <Intro key="intro" />,
      <Cowork key="cowork" isCoworked={isCoworked} setIsCoworked={setIsCoworked} />,
      <ShortQuestion
        key="strength"
        headerTitle="협업을 하면서 느꼈던 예진님만의 장점이 있나요?"
        setReplies={setStrength}
        startMessage={[
          { timing: 1000, text: '협업을 한 적이 없다면 일상에서 드러나는 성격이나 행동에 대한 장점을 적어주세요.' },
          { timing: 2000, text: '답변을 적어 저에게 메세지를 보내주시면, 익명으로 전달할게요!' },
        ]}
        afterUserMessage={[{ timing: 1000, text: '못한 말이 있다면 더 보낼 수 있어요.' }]}
      />,
      <div key="div">2</div>,
      <div key="div2">3</div>,
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

const useStrength = () => {
  const [strength, setStrength] = useState<string[]>([]);

  return { strength, setStrength };
};
