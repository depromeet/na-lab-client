import { type Dispatch } from 'react';
import { Reorder } from 'framer-motion';
import { type SetStateAction } from 'jotai';

import useToast from '~/components/toast/useToast';
import AddMyQuestion from '~/features/survey/addSurveyForm/AddMyQuestion';
import QuestionWithDnd from '~/features/survey/questionList/QuestionWithDnd';
import SurveyFormBottomSheet from '~/features/survey/SurveyFormBottomSheet';
import { type QuestionItem } from '~/features/survey/types';
import useBoolean from '~/hooks/common/useBoolean';

interface Props {
  customItems: QuestionItem[];
  setCustomsItems: Dispatch<SetStateAction<QuestionItem[]>>;

  isDeleteMode: boolean;
}

const AdditionalQuestionList = ({ customItems, setCustomsItems, isDeleteMode }: Props) => {
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

  const onDeleteCustomQuestion = (id: string) => {
    setCustomsItems((prev) => prev.filter((item) => item.title !== id));
  };

  return (
    <>
      <Reorder.Group data-testid="dnd-component" as="ul" values={customItems} onReorder={setCustomsItems}>
        {customItems.map((item) => (
          <QuestionWithDnd item={item} key={item.title} isDeleteMode={isDeleteMode} onDelete={onDeleteCustomQuestion} />
        ))}
      </Reorder.Group>

      <AddMyQuestion onAction={onAddQuestionClick} />

      <SurveyFormBottomSheet isShowing={isShowing} toggleShowing={toggleShowing} onAction={addNewQuestion} />
    </>
  );
};

export default AdditionalQuestionList;
