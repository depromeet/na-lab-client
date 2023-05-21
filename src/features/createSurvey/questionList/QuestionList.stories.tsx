import { type Meta } from '@storybook/react';

import QuestionList from '~/features/createSurvey/questionList/QuestionList';

const meta: Meta<typeof QuestionList> = {
  title: 'QuestionList',
  component: QuestionList,
};

export default meta;

export function Default() {
  return <QuestionList />;
}
