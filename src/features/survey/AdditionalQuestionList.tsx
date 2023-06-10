import { Reorder } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';

import useToast from '~/components/toast/useToast';
import AddMyQuestion from '~/features/survey/addSurveyForm/AddMyQuestion';
import QuestionWithDnd from '~/features/survey/questionList/QuestionWithDnd';
import SurveyFormBottomSheet from '~/features/survey/SurveyFormBottomSheet';
import { type QuestionItem } from '~/features/survey/types';
import useBoolean from '~/hooks/common/useBoolean';
import {
  addSurveyCustomQuestionAtom,
  deleteSurveyCustomQuestionAtom,
  getSurveyCustomQuestionsAtom,
  reorderSurveyCustomQuestionsAtom,
} from '~/store/surveyCustomQuestions';

const AdditionalQuestionList = () => {
  const customItems = useAtomValue(getSurveyCustomQuestionsAtom);
  const addCustomQuestion = useSetAtom(addSurveyCustomQuestionAtom);
  const deleteCustomQuestion = useSetAtom(deleteSurveyCustomQuestionAtom);
  const reorderCustomQuestions = useSetAtom(reorderSurveyCustomQuestionsAtom);

  const [isShowing, toggleShowing] = useBoolean(false);
  const { fireToast } = useToast();

  const addNewQuestion = (question: QuestionItem) => {
    addCustomQuestion(question);
    toggleShowing();
  };

  const onAddQuestionClick = () => {
    if (customItems.length >= 20) {
      fireToast({ content: '최대 20개의 질문을 추가할 수 있습니다.', higherThanCTA: true });

      return;
    }

    toggleShowing();
  };

  const onDeleteCustomQuestion = (questionTitle: string) => {
    deleteCustomQuestion(questionTitle);
  };

  return (
    <>
      <Reorder.Group data-testid="dnd-component" as="ul" values={customItems} onReorder={reorderCustomQuestions}>
        {customItems.map((item) => (
          <QuestionWithDnd item={item} key={item.title} onDelete={onDeleteCustomQuestion} />
        ))}
      </Reorder.Group>

      <AddMyQuestion onAction={onAddQuestionClick} />

      <SurveyFormBottomSheet isShowing={isShowing} toggleShowing={toggleShowing} onAction={addNewQuestion} />
    </>
  );
};

export default AdditionalQuestionList;
