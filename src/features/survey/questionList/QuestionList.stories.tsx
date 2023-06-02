import { type Meta } from '@storybook/react';

import { BASIC_QUESTION_LIST } from '~/features/survey/constants';
import QuestionList from '~/features/survey/questionList/QuestionList';

const meta: Meta<typeof QuestionList> = {
  title: 'QuestionList',
  component: QuestionList,
};

export default meta;

export function Default() {
  return <QuestionList items={BASIC_QUESTION_LIST} />;
}
