import { type Meta } from '@storybook/react';

import { ArrowCircleButton } from '~/components/button/CircleButton';
import useStep from '~/hooks/step/useStep';

import StepStatus from './StepStatus';

const meta: Meta = {
  title: 'Review Step Status',
  component: StepStatus,
};

export default meta;

export const Default = ({ stepLength = 3 }) => {
  const { currentStep, next, prev } = useStep({ initial: 1, max: stepLength });

  return (
    <>
      <StepStatus currentStep={currentStep} stepLength={stepLength} notContainSteps={[]} />

      <div style={{ marginTop: '200px', display: 'flex' }}>
        <ArrowCircleButton onClick={prev} />
        <ArrowCircleButton direction="right" onClick={next} />
      </div>
    </>
  );
};
