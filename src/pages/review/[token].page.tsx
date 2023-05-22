import { AnimatePresence } from 'framer-motion';

import Intro from '~/features/review/steps/Intro';
import useInjectedElementStep from '~/hooks/step/useInjectedElementStep';

const ReviewPage = () => {
  // TODO: 이후 token 검증 및 조회 로직 추가
  // const router = useRouter();
  // const { token } = router.query;

  const { currentElement } = useInjectedElementStep({
    elements: [<Intro key="intro" />, <div key="div">2</div>, <div key="div2">3</div>],
  });

  return (
    <main>
      <AnimatePresence mode="wait">{currentElement}</AnimatePresence>
    </main>
  );
};

export default ReviewPage;
