import { useState } from 'react';
import { css } from '@emotion/react';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import AddMyQuestion from '~/features/createSurvey/addSurvey/AddMyQuestion';
import AddSurveyForm from '~/features/createSurvey/addSurvey/AddSurveyForm';
import { BASIC_QUESTION_LIST } from '~/features/createSurvey/constants';
import QuestionList from '~/features/createSurvey/questionList/QuestionList';
import QuestionWithDndList from '~/features/createSurvey/questionList/QuestionListWithDnd';
import { type QuestionItem } from '~/features/createSurvey/types';
import useBoolean from '~/hooks/common/useBoolean';

const CreateSurvey = () => {
  const [customItems, setCustomsItems] = useState<QuestionItem[]>(BASIC_QUESTION_LIST);
  const [isShowing, toggleShowing] = useBoolean(false);

  return (
    <section css={containerCss}>
      <h1>기본 질문</h1>
      <QuestionList items={BASIC_QUESTION_LIST} />
      <h1>추가 질문</h1>
      <QuestionWithDndList items={customItems} setItems={setCustomsItems} />
      <AddMyQuestion onAction={toggleShowing} />
      <BottomSheet isShowing={isShowing}>
        <BottomSheetHandleIcon onClick={toggleShowing} />
        <AddSurveyForm />
      </BottomSheet>
    </section>
  );
};

export default CreateSurvey;

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// const buttonCss = css`
//   all: unset;

//   cursor: pointer;

//   display: flex;
//   flex-direction: column;
//   gap: 11px;
//   align-items: center;
//   justify-content: center;

//   width: 100%;
//   padding: 25px 106px;

//   color: #37c3ff;

//   background-color: #f7f8f9;
//   border-radius: 12px;
// `;
