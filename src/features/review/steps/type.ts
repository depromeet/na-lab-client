import type useStep from '~/hooks/step/useStep';

type UseStepReturn = ReturnType<typeof useStep>;

export interface StepProps {
  next?: UseStepReturn['next'];
  prev?: UseStepReturn['prev'];
}

export type Position = 'designer' | 'product-manager' | 'programmer' | 'other';

export interface IsLastQuestion {
  isLastQuestion?: boolean;
}
