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

export const OPTION_MAX_LENGTH = 18; // 선택지 최대 공백포함 18자 (1줄)
export const QUESTION_MAX_LENGTH = 50; // 질문 최대 공백포함 45자 (3줄)

export const OPTION_MAX_COUNT = 20;
export const OPTION_MIN_COUNT = 2;

export const CHOICE_CASE_MAX_SELECT_COUNT = 1;

export const DEFAULT_OPTION_LENGTH = 2; // 디폴트 선택지 2개 생성
export const DEFAULT_MAX_SELECT_COUNT = 2; // 디폴트 복수 선택 개수 2개

export const MULTI_SELECT_MAX_COUNT = 19; // 복수 선택 개수 최솟값 : 2
export const MULTI_SELECT_MIN_COUNT = 2; // 복수 선택 개수 최댓값 : 19개
