export type QuestionType = 'choice' | 'short';
export type QuestionFormType = 'strength' | 'weakness' | 'tendency' | 'custom';

interface Choice {
  content: string;
  order: number;
}

export interface ChoiceQuestionRequest {
  type: 'choice';
  form_type: QuestionFormType;
  title: string;
  choices: Choice[];
  max_selectable_count: number;
  order: number;
}

export interface ShortQuestionRequest {
  type: 'short';
  form_type: QuestionFormType;
  title: string;
  order: number;
}

export type QuestionItem = Omit<ChoiceQuestionRequest, 'order'> | Omit<ShortQuestionRequest, 'order'>;
export type QuestionRequest = ChoiceQuestionRequest | ShortQuestionRequest;
