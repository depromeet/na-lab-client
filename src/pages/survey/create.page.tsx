import { useRouter } from 'next/router';
import { css } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';
import Header from '~/components/header/Header';
import { SURVEY_PATH } from '~/constants/path';
import CreateStopDialog from '~/features/survey/addSurveyForm/CreateStopDialog';
import CreateSurvey from '~/features/survey/CreateSurvey';
import { fixedBottomCss } from '~/features/survey/styles';
import useBoolean from '~/hooks/common/useBoolean';

const CreateSurveyPage = () => {
  const router = useRouter();
  const [isDialogOpen, _, onDialogOpen, onDialogClose] = useBoolean(false);

  const onStop = () => {
    onDialogClose();
    router.push(SURVEY_PATH.INIT);
  };

  return (
    <main css={containerCss}>
      <Header title="나의 질문폼" onBackClick={onDialogOpen} />
      <CreateSurvey />
      <section css={[fixedBottomCss]}>
        <CTAButton color="blue">이대로 생성하기</CTAButton>
      </section>
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
