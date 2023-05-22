import { type QuestionItem } from '~/features/createSurvey/types';

export const BASIC_QUESTION_LIST: QuestionItem[] = [
  {
    type: 'choice',
    form_type: 'tendency',
    title: '나와의 관계, 상대방의 포지션, 나의 성향',
    choices: [],
    max_selectable_count: 1,
  },
  {
    type: 'short',
    form_type: 'strength',
    title: '나의 직무적 강점은 무엇인가요?',
  },
  {
    type: 'short',
    form_type: 'weakness',
    title: '나의 직무적 약점은 무엇인가요?',
  },
];
