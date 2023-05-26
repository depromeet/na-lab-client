import { css } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';
import Header from '~/components/header/Header';
import CreateSurvey from '~/features/survey/CreateSurvey';
import { fixedBottomCss } from '~/features/survey/styles';

const CreateSurveyPage = () => {
  return (
    <main css={containerCss}>
      <Header title="나의 질문폼" />
      <CreateSurvey />
      <section css={[fixedBottomCss]}>
        <CTAButton color="blue">이대로 생성하기</CTAButton>
      </section>
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
