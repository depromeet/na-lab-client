import { css, type Theme } from '@emotion/react';
import { useAtom, useAtomValue } from 'jotai';

import Header from '~/components/header/Header';
import CreateStopDialog from '~/features/survey/addSurveyForm/CreateStopDialog';
import CreateSurvey from '~/features/survey/CreateSurvey';
import useBoolean from '~/hooks/common/useBoolean';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import { getSurveyCustomQuestionsAtom } from '~/store/surveyCustomQuestions';
import { surveyDeleteModeAtom } from '~/store/surveyDeleteMode';
import { BODY_1 } from '~/styles/typo';

const CreateSurveyPage = () => {
  const router = useInternalRouter();

  const [isDeleteMode, setIsDeleteMode] = useAtom(surveyDeleteModeAtom);

  const customItems = useAtomValue(getSurveyCustomQuestionsAtom);
  const isCustomItemsEmpty = customItems.length === 0;
  const [isDialogOpen, _, onDialogOpen, onDialogClose] = useBoolean(false);

  const onStop = () => {
    onDialogClose();
    router.push('/survey');
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
