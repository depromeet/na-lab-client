import { useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';

import Intro from '~/features/review/steps/Intro';
import useInjectedElementStep from '~/hooks/step/useInjectedElementStep';

const Cowork = dynamic(() => import('~/features/review/steps/Cowork'), { ssr: false });

const ReviewPage = () => {
  // TODO: 이후 token 검증 및 조회 로직 추가
  // const router = useRouter();
  // const { token } = router.query;

  const { isCoworked, setIsCoworked } = useIsCowork();

  const { currentElement } = useInjectedElementStep({
    elements: [
      <Intro key="intro" />,
      <Cowork key="cowork" isCoworked={isCoworked} setIsCoworked={setIsCoworked} />,
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
