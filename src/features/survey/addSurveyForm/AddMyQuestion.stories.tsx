import { useState } from 'react';
import { type Meta } from '@storybook/react';
import { Reorder } from 'framer-motion';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import AddMyQuestion from '~/features/survey/addSurveyForm/AddMyQuestion';
import QuestionWithDnd from '~/features/survey/questionList/QuestionWithDnd';
import { type CustomQuestionItem } from '~/features/survey/types';
import useBoolean from '~/hooks/common/useBoolean';

import AddSurveyForm from './AddSurveyForm';

const meta: Meta<typeof AddSurveyForm> = {
  title: 'AddSurveyForm',
  component: AddSurveyForm,
};

export default meta;

export function Default() {
  const [customItems, setCustomsItems] = useState<CustomQuestionItem[]>([]);
  const [isShowing, toggleShowing] = useBoolean(false);

  const addNewQuestion = (question: CustomQuestionItem) => {
    setCustomsItems((prev) => [...prev, question]);
    toggleShowing();
  };

  const onDeleteCustomQuestion = (id: string) => {
    setCustomsItems((prev) => prev.filter((item) => item.title !== id));
  };

  return (
    <>
      <Reorder.Group as="ul" values={customItems} onReorder={setCustomsItems}>
        {customItems.map((item) => (
          <QuestionWithDnd item={item} key={item.title} onDelete={onDeleteCustomQuestion} />
        ))}
      </Reorder.Group>

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
