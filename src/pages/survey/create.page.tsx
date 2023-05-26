import { css } from '@emotion/react';

import Header from '~/components/header/Header';
import CreateSurvey from '~/features/survey/CreateSurvey';

const CreateSurveyPage = () => {
  return (
    <main css={containerCss}>
      <Header title="나의 질문폼" />
      <CreateSurvey />
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
