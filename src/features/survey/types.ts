export type QuestionType = 'choice' | 'short' | 'basic';

export type BasicQuestionFormType = 'tendency' | 'strength' | 'information' | 'weakness';
export type QuestionFormType = BasicQuestionFormType | 'custom';

export type RequestQuestionType = 'choice' | 'short';
export type RequestQuestionFormType = 'strength' | 'weakness' | 'tendency' | 'custom';

interface Choice {
  content: string;
  order: number;
}

export interface BasicQuestionItem {
  type: 'basic';
  form_type: BasicQuestionFormType;
  title: string;
}

export interface BasicQuestionRequest {
  type: RequestQuestionType;
  form_type: RequestQuestionFormType;
  title: string;
}

export interface ChoiceQuestionRequest {
  type: 'choice' | 'basic';
  form_type: RequestQuestionFormType;
  title: string;
  choices: Choice[];
  max_selection_count: number;
  order: number;
}

export interface ShortQuestionRequest {
  type: 'short' | 'basic';
  form_type: RequestQuestionFormType;
  title: string;
  order: number;
}

export interface ChoiceQuestionItem {
  type: 'choice';
  form_type: 'custom';
  title: string;
  choices: Choice[];
  max_selection_count: number;
}

export interface ShortQuestionItem {
  type: 'short';
  form_type: 'custom';
  title: string;
}

export type CustomQuestionItem = ChoiceQuestionItem | ShortQuestionItem;

export type QuestionRequest = ChoiceQuestionRequest | ShortQuestionRequest;

export interface CreateSurveyRequest {
  question_count: number;
  question: QuestionRequest[];
}
