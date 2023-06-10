import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';

import CTAButton from '~/components/button/CTAButton';
import AddQuestionList from '~/features/survey/AdditionalQuestionList';
import { REQUEST_BASIC_QUESTION_LIST, VIEW_BASIC_QUESTION_LIST } from '~/features/survey/constants';
import CreateDialog from '~/features/survey/CreateDialog';
import QuestionList from '~/features/survey/questionList/QuestionList';
import { fixedBottomCss } from '~/features/survey/styles';
import { type CustomQuestionItem, type QuestionRequest } from '~/features/survey/types';
import useBoolean from '~/hooks/common/useBoolean';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import useLocalStorage from '~/hooks/storage/useLocalStorage';
import { getSurveyCustomQuestionsAtom } from '~/store/surveyCustomQuestions';
import { surveyDeleteModeAtom } from '~/store/surveyDeleteMode';

const CreateSurvey = () => {
  const router = useInternalRouter();

  const [isDialogShowing, toggleDialogShowing] = useBoolean(false);

  const [_, setCreateSurveyRequest] = useLocalStorage<QuestionRequest[]>('createSurveyRequest', []);

  const isDeleteMode = useAtomValue(surveyDeleteModeAtom);
  const customItems = useAtomValue(getSurveyCustomQuestionsAtom);

  const onCreateSurvey = () => {
    const data = getCreateSurveyRequestData(customItems);
    setCreateSurveyRequest(data);

    router.push('/survey/join');
  };

  return (
    <>
      <section css={sectionCss}>
        <h1>기본 질문</h1>
        <QuestionList items={VIEW_BASIC_QUESTION_LIST} />
      </section>

      <section css={sectionCss}>
        <h1>추가 질문</h1>
        <AddQuestionList />
      </section>

      <section css={fixedBottomCss}>
        <CTAButton onClick={toggleDialogShowing} color="blue" disabled={isDeleteMode}>
          이대로 생성하기
        </CTAButton>
      </section>

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

const getCreateSurveyRequestData = (customItems: CustomQuestionItem[]): QuestionRequest[] => {
  const basicQuestions = REQUEST_BASIC_QUESTION_LIST;

  const customQuestions = customItems.map((item, idx) => ({
    ...item,
    order: idx + REQUEST_BASIC_QUESTION_LIST.length + 1,
  }));

  return [...basicQuestions, ...customQuestions];
};
