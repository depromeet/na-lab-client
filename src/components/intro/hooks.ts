import { useEffect } from 'react';

import useBoolean from '~/hooks/common/useBoolean';
import useStep from '~/hooks/step/useStep';

const 문구_수 = 4;
const 매_문구_지속시간 = 3500;

export const useParagraphStep = () => {
  const { currentStep, next: paragraphStep } = useStep({ initial: 1, max: 문구_수 });

  useEffect(() => {
    const interval = setInterval(paragraphStep, 매_문구_지속시간);

    return () => {
      clearInterval(interval);
    };
  }, [paragraphStep]);

  return {
    currentStep,
    paragraphStep,
  };
};

export const useCTAButtonVisible = () => {
  const [isCTAButtonVisible, _, setTrue] = useBoolean(false);

  useEffect(() => {
    const timeout = setTimeout(setTrue, 매_문구_지속시간 * 문구_수);

    return () => {
      clearTimeout(timeout);
    };
  }, [setTrue]);

  return { isCTAButtonVisible, skip: setTrue };
};
