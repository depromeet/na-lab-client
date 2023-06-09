import { type Dispatch } from 'react';
import { Reorder } from 'framer-motion';
import { type SetStateAction } from 'jotai';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import useToast from '~/components/toast/useToast';
import AddMyQuestion from '~/features/survey/addSurveyForm/AddMyQuestion';
import AddSurveyForm from '~/features/survey/addSurveyForm/AddSurveyForm';
import QuestionWithDnd from '~/features/survey/questionList/QuestionWithDnd';
import { type QuestionItem } from '~/features/survey/types';
import useBoolean from '~/hooks/common/useBoolean';

interface Props {
  customItems: QuestionItem[];
  setCustomsItems: Dispatch<SetStateAction<QuestionItem[]>>;
}

const AddQuestionList = ({ customItems, setCustomsItems }: Props) => {
  const [isDeleteMode, toggleIsDeleteMode] = useBoolean(false);
  const [isShowing, toggleShowing] = useBoolean(false);
  const { fireToast } = useToast();

  const addNewQuestion = (question: QuestionItem) => {
    setCustomsItems((prev) => [...prev, question]);
    toggleShowing();
  };

  const onAddQuestionClick = () => {
    if (customItems.length >= 20) {
      fireToast({ content: '최대 20개의 질문을 추가할 수 있습니다.', higherThanCTA: true });

      return;
    }

    toggleShowing();
  };

  const onDeleteCustomQuestion = (title: string) => {
    setCustomsItems((prev) => prev.filter((item) => item.title !== title));
  };

  return (
    <>
      <Reorder.Group data-testid="dnd-component" as="ul" values={customItems} onReorder={setCustomsItems}>
        {customItems.map((item) => (
          <QuestionWithDnd key={item.title} item={item} onDelete={onDeleteCustomQuestion} isDeleteMode={isDeleteMode} />
        ))}
      </Reorder.Group>

      <AddMyQuestion onAction={onAddQuestionClick} />

      <BottomSheet isShowing={isShowing}>
        <button type="button" onClick={toggleShowing}>
          <BottomSheetHandleIcon />
        </button>
        <AddSurveyForm onClose={toggleShowing} onAction={addNewQuestion} />
      </BottomSheet>
    </>
  );
};

export default AddQuestionList;
