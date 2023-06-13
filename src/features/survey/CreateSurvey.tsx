import { css } from '@emotion/react';

import AddQuestionList from '~/features/survey/AdditionalQuestionList';
import { VIEW_BASIC_QUESTION_LIST } from '~/features/survey/constants';
import QuestionList from '~/features/survey/questionList/QuestionList';

const CreateSurvey = () => {
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
