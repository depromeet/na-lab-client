import { useState } from 'react';
import { css } from '@emotion/react';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import CTAButton from '~/components/button/CTAButton';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import AddMyQuestion from '~/features/survey/addSurveyForm/AddMyQuestion';
import AddSurveyForm from '~/features/survey/addSurveyForm/AddSurveyForm';
import { BASIC_QUESTION_LIST } from '~/features/survey/constants';
import CreateDialog from '~/features/survey/CreateDialog';
import QuestionList from '~/features/survey/questionList/QuestionList';
import QuestionWithDndList from '~/features/survey/questionList/QuestionListWithDnd';
import { fixedBottomCss } from '~/features/survey/styles';
import { type QuestionItem, type QuestionRequest } from '~/features/survey/types';
import useBoolean from '~/hooks/common/useBoolean';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import useLocalStorage from '~/hooks/storage/useLocalStorage';

const CreateSurvey = () => {
  const router = useInternalRouter();
  const [isShowing, toggleShowing] = useBoolean(false);
  const [isDialogShowing, toggleDialogShowing] = useBoolean(false);

  const [customItems, setCustomsItems] = useState<QuestionItem[]>([]);

  const [_, setCreateSurveyRequest] = useLocalStorage<QuestionRequest[]>('createSurveyRequest', []);

  const addNewQuestion = (question: QuestionItem) => {
    setCustomsItems((prev) => [...prev, question]);
    toggleShowing();
  };

  const onCreateSurvey = () => {
    const data = getCreateSurveyRequestData(customItems);
    setCreateSurveyRequest(data);

    router.push('/survey/join');
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
      <section css={[fixedBottomCss]}>
        <CTAButton onClick={toggleDialogShowing} color="blue">
          이대로 생성하기
        </CTAButton>
      </section>

      <BottomSheet isShowing={isShowing}>
        <button type="button" onClick={toggleShowing}>
          <BottomSheetHandleIcon />
        </button>
        <AddSurveyForm onClose={toggleShowing} onAction={addNewQuestion} />
      </BottomSheet>
      <CreateDialog isShowing={isDialogShowing} onClose={toggleDialogShowing} onAction={onCreateSurvey} />
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

const getCreateSurveyRequestData = (customItems: QuestionItem[]): QuestionRequest[] => {
  const basicQuestions = BASIC_QUESTION_LIST.map((item, idx) => ({
    ...item,
    order: idx + 1,
  }));

  const customQuestions = customItems.map((item, idx) => ({
    ...item,
    order: idx + BASIC_QUESTION_LIST.length + 1,
  }));

  return [...basicQuestions, ...customQuestions];
};
