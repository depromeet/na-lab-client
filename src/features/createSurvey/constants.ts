import { type ChoiceQuestionRequest, type ShortQuestionRequest } from '~/features/createSurvey/types';

type QuestionItem = ChoiceQuestionRequest | ShortQuestionRequest;

export const BASIC_QUESTION_LIST: QuestionItem[] = [
  {
    type: 'choice',
    form_type: 'tendency',
    title: '나와의 관계, 상대방의 포지션, 나의 성향',
    order: 1,
    choices: [],
    max_selectable_count: 1,
  },
  {
    type: 'short',
    form_type: 'strength',
    title: '나의 직무적 강점은 무엇인가요?',
    order: 2,
  },
  {
    type: 'short',
    form_type: 'weakness',
    title: '나의 직무적 약점은 무엇인가요?',
    order: 3,
  },
];
