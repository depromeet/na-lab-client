import { cloneElement, type ReactElement } from 'react';

import useStep from './useStep';

type UseStepParamsWithoutMax = Omit<Parameters<typeof useStep>[0], 'max'>;

interface Props extends UseStepParamsWithoutMax {
  elements: ReactElement[];
}

const useInjectedElementStep = ({ initial = 0, elements }: Props) => {
  const { currentStep, prev, next } = useStep({ initial, max: elements.length - 1 });

  return {
    currentElement: cloneElement(elements[currentStep], { next, prev }),
    currentStep,
    prev,
    next,
  };
};

export default useInjectedElementStep;
