export type QuestionType = 'choice' | 'short';
export type QuestionFormType = 'strength' | 'weakness' | 'tendency' | 'custom';

export interface ChoiceQuestionRequest {
  type: 'choice';
  form_type: QuestionFormType;
  title: string;
  choices: {
    content: string;
    order: number;
  }[];
  max_selectable_count: number;
  order: number;
}

export interface ShortQuestionRequest {
  type: 'short';
  form_type: QuestionFormType;
  title: string;
  order: number;
}

export type QuestionItem = ChoiceQuestionRequest | ShortQuestionRequest;
