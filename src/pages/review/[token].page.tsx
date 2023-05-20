import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

import Intro from '~/features/review/Intro';
import useElementStep from '~/hooks/step/useElementStep';

const ReviewPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const { currentElement, next, prev } = useElementStep({
    elements: [<Intro key="intro" />, <div key="div">2</div>, <div key="div2">3</div>],
  });

  return (
    <main>
      <h1>{token}</h1>

      <AnimatePresence mode="wait">{currentElement}</AnimatePresence>
      <button onClick={prev} type="button">
        prev
      </button>
      <button onClick={next} type="button">
        next
      </button>
    </main>
  );
};

export default ReviewPage;
