import { softskillList } from '~/components/graphic/softskills/Softskill';
import { type BasicQuestionItem, type QuestionRequest } from '~/features/survey/types';

const softSkillChoices: {
  content: string;
  order: number;
}[] = softskillList.map((softskill, index) => ({
  content: softskill as string,
  order: index,
}));

export const VIEW_BASIC_QUESTION_LIST: BasicQuestionItem[] = [
  {
    type: 'basic',
    form_type: 'information',
    title: '나와의 관계, 참여한 동료의 포지션',
  },
  {
    type: 'basic',
    form_type: 'tendency',
    title: '동료들이 생각한 나의 이미지',
  },
  {
    type: 'basic',
    form_type: 'strength',
    title: '협업을 하면서 느꼈던 나만의 장점이 있나요?',
  },
];

export const REQUEST_BASIC_QUESTION_LIST: QuestionRequest[] = [
  {
    type: 'choice',
    form_type: 'tendency',
    title: '동료들이 생각한 나의 이미지',
    choices: softSkillChoices,
    max_selection_count: 5,
    order: 1,
  },
  {
    type: 'short',
    form_type: 'strength',
    title: '협업을 하면서 느꼈던 나만의 장점이 있나요?',
    order: 2,
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
