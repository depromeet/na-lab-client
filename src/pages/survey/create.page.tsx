import { css, type Theme } from '@emotion/react';

import Header from '~/components/header/Header';
import CreateStopDialog from '~/features/survey/addSurveyForm/CreateStopDialog';
import CreateSurvey from '~/features/survey/CreateSurvey';
import useBoolean from '~/hooks/common/useBoolean';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import { BODY_1 } from '~/styles/typo';

const CreateSurveyPage = () => {
  const router = useInternalRouter();
  const [isDialogOpen, _, onDialogOpen, onDialogClose] = useBoolean(false);
  const [isDeleteMode, toggleIsDeleteMode] = useBoolean(false);

  const onStop = () => {
    onDialogClose();
    router.push('/survey');
  };

  return (
    <main css={containerCss}>
      <Header
        title="나의 질문폼"
        onBackClick={onDialogOpen}
        rightButton={
          <button css={(theme) => deleteButtonCss(isDeleteMode, theme)} type="button" onClick={toggleIsDeleteMode}>
            {isDeleteMode ? '완료' : '삭제하기'}
          </button>
        }
      />
      <CreateSurvey isDeleteMode={isDeleteMode} />

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
`;
