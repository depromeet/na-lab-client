import { useState } from 'react';

interface Props {
  initial?: number;
  max?: number;
}

const useStep = ({ initial = 0, max }: Props) => {
  const [currentStep, setCurrentStep] = useState(initial);

  function prev(n?: number) {
    if (0 >= currentStep) return;
    setCurrentStep((prevStep) => prevStep - (n ? n : 1));
  }

  function next(n?: number) {
    if (currentStep >= (max || Infinity)) return;
    setCurrentStep((prevStep) => {
      if (prevStep === (max || Infinity)) return prevStep;

      return prevStep + (n ? n : 1);
    });
  }

  return { currentStep, setCurrentStep, prev, next };
};

export default useStep;
