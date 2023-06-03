export interface StepProps {
  next?: () => void;
  prev?: () => void;
}

export type Position = 'designer' | 'product-manager' | 'programmer' | 'other';

export interface IsLastQuestion {
  isLastQuestion?: boolean;
}
