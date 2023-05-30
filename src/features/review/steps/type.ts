export interface StepProps {
  next?: () => void;
  prev?: () => void;
}

export interface IsLastQuestion {
  isLastQuestion: boolean;
}
