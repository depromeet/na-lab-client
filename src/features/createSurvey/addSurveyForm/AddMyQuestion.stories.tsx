import { useState } from 'react';
import { type Meta } from '@storybook/react';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import AddMyQuestion from '~/features/createSurvey/addSurveyForm/AddMyQuestion';
import QuestionWithDndList from '~/features/createSurvey/questionList/QuestionListWithDnd';
import { type QuestionItem } from '~/features/createSurvey/types';
import useBoolean from '~/hooks/common/useBoolean';

import AddSurveyForm from './AddSurveyForm';

const meta: Meta<typeof AddSurveyForm> = {
  title: 'AddSurveyForm',
  component: AddSurveyForm,
};

export default meta;

export function Default() {
  const [customItems, setCustomsItems] = useState<QuestionItem[]>([]);
  const [isShowing, toggleShowing] = useBoolean(false);

  const addNewQuestion = (question: QuestionItem) => {
    setCustomsItems((prev) => [...prev, question]);
    toggleShowing();
  };

  return (
    <>
      <QuestionWithDndList items={customItems} setItems={setCustomsItems} />

      <AddMyQuestion onAction={toggleShowing} />
      <BottomSheet isShowing={isShowing}>
        <button type="button" onClick={toggleShowing}>
          <BottomSheetHandleIcon />
        </button>
        <AddSurveyForm onClose={toggleShowing} onAction={addNewQuestion} />
      </BottomSheet>
    </>
  );
}
