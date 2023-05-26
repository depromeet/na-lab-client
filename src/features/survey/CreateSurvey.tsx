import { useState } from 'react';
import { css } from '@emotion/react';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import AddMyQuestion from '~/features/survey/addSurveyForm/AddMyQuestion';
import AddSurveyForm from '~/features/survey/addSurveyForm/AddSurveyForm';
import { BASIC_QUESTION_LIST } from '~/features/survey/constants';
import QuestionList from '~/features/survey/questionList/QuestionList';
import QuestionWithDndList from '~/features/survey/questionList/QuestionListWithDnd';
import { type QuestionItem } from '~/features/survey/types';
import useBoolean from '~/hooks/common/useBoolean';

const CreateSurvey = () => {
  const [customItems, setCustomsItems] = useState<QuestionItem[]>([]);
  const [isShowing, toggleShowing] = useBoolean(false);

  const addNewQuestion = (question: QuestionItem) => {
    setCustomsItems((prev) => [...prev, question]);
    toggleShowing();
  };

  return (
    <>
      <section css={sectionCss}>
        <h1>기본 질문</h1>
        <QuestionList items={BASIC_QUESTION_LIST} />
      </section>
      <section css={sectionCss}>
        <h1>추가 질문</h1>
        <QuestionWithDndList items={customItems} setItems={setCustomsItems} />
        <AddMyQuestion onAction={toggleShowing} />
      </section>
      <BottomSheet isShowing={isShowing}>
        <button type="button" onClick={toggleShowing}>
          <BottomSheetHandleIcon />
        </button>
        <AddSurveyForm onClose={toggleShowing} onAction={addNewQuestion} />
      </BottomSheet>
    </>
  );
};

export default CreateSurvey;

const sectionCss = css`
  margin: 0 7px;

  & > h1 {
    margin-bottom: 0.75rem;
  }
`;
