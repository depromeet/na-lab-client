import { css, type Theme } from '@emotion/react';
import { useAtom, useAtomValue } from 'jotai';

import CTAButton from '~/components/button/CTAButton';
import Header from '~/components/header/Header';
import CreateStopDialog from '~/features/survey/addSurveyForm/CreateStopDialog';
import { REQUEST_BASIC_QUESTION_LIST } from '~/features/survey/constants';
import CreateDialog from '~/features/survey/CreateDialog';
import CreateSurvey from '~/features/survey/CreateSurvey';
import { fixedBottomCss } from '~/features/survey/styles';
import { type CustomQuestionItem, type QuestionRequest } from '~/features/survey/types';
import useBoolean from '~/hooks/common/useBoolean';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import useLocalStorage from '~/hooks/storage/useLocalStorage';
import { getSurveyCustomQuestionsAtom } from '~/store/surveyCustomQuestions';
import { surveyDeleteModeAtom } from '~/store/surveyDeleteMode';
import { BODY_1 } from '~/styles/typo';

const CreateSurveyPage = () => {
  const router = useInternalRouter();
  const [, setCreateSurveyRequest] = useLocalStorage<QuestionRequest[]>('createSurveyRequest', []);

  const [isDeleteMode, setIsDeleteMode] = useAtom(surveyDeleteModeAtom);
  const customItems = useAtomValue(getSurveyCustomQuestionsAtom);

  const [isDialogOpen, , onDialogOpen, onDialogClose] = useBoolean(false);
  const [isDialogShowing, toggleDialogShowing] = useBoolean(false);

  const isCustomItemsEmpty = customItems.length === 0;

  const onStop = () => {
    onDialogClose();
    router.push('/survey');
  };

  const onSubmit = () => {
    const data = getCreateSurveyRequestData(customItems);
    setCreateSurveyRequest(data);

    router.push('/survey/join');
  };

  useDidUpdate(() => {
    customItems.length === 0 && setIsDeleteMode(false);
  }, [customItems.length]);

  return (
    <main css={containerCss}>
      <Header
        title="나의 질문폼"
        onBackClick={onDialogOpen}
        rightButton={
          <button
            disabled={isCustomItemsEmpty}
            css={(theme) => deleteButtonCss(isDeleteMode, theme)}
            type="button"
            onClick={() => setIsDeleteMode(!isDeleteMode)}
          >
            {isDeleteMode ? '완료' : '삭제하기'}
          </button>
        }
      />
      <CreateSurvey />

      <section css={fixedBottomCss}>
        <CTAButton onClick={toggleDialogShowing} color="blue" disabled={isDeleteMode}>
          이대로 생성하기
        </CTAButton>
      </section>

      <CreateDialog isShowing={isDialogShowing} onClose={toggleDialogShowing} onAction={onSubmit} />
      <CreateStopDialog isShowing={isDialogOpen} onClose={onDialogClose} onAction={onStop} />
    </main>
  );
};

export default CreateSurveyPage;

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  width: 100%;
  min-height: 100vh;
  padding-top: 4.5rem;
  padding-bottom: 6.25rem;
`;

const deleteButtonCss = (isDeleteMode: boolean, theme: Theme) => css`
  ${BODY_1}

  color: ${isDeleteMode ? theme.colors.primary_200 : theme.colors.red};
  ${isDeleteMode && 'text-decoration: underline;'}

  transition: color 0.2s ease-in-out;

  &:disabled {
    color: ${theme.colors.gray_400};
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
