import { useState } from 'react';

interface Props {
  initial?: number;
  max?: number;
}

const useStep = ({ initial = 0, max }: Props) => {
  const [currentStep, setCurrentStep] = useState(initial);

  const prev = () => {
    if (0 >= currentStep) return;
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const next = () => {
    if (currentStep >= (max || Infinity)) return;
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return { currentStep, setCurrentStep, prev, next };
};

export default useStep;
