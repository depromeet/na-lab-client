import { useState } from 'react';
import { type Meta } from '@storybook/react';

import { BASIC_QUESTION_LIST } from '~/features/survey/constants';
import QuestionList from '~/features/survey/questionList/QuestionList';
import QuestionWithDndList from '~/features/survey/questionList/QuestionListWithDnd';
import { type QuestionItem } from '~/features/survey/types';

const meta: Meta<typeof QuestionList> = {
  title: 'QuestionList',
  component: QuestionList,
};

export default meta;

export function Default() {
  return <QuestionList items={BASIC_QUESTION_LIST} />;
}

export function DndList() {
  const [customs, setCustoms] = useState<QuestionItem[]>(BASIC_QUESTION_LIST);

  return <QuestionWithDndList items={customs} setItems={setCustoms} />;
}
