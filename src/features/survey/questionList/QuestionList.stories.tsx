import { type Meta } from '@storybook/react';

import QuestionList from '~/features/survey/questionList/QuestionList';

const meta: Meta<typeof QuestionList> = {
  title: 'QuestionList',
  component: QuestionList,
};

export default meta;

// TODO : 개발 끝나면, 스토리북에 기본질문 목록 띄우기
export function Default() {
  return <QuestionList items={[]} />;
}
