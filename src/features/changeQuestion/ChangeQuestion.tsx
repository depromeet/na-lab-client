import { css } from '@emotion/react';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';

import { BASIC_QUESTION_LIST } from '../survey/constants';
import Question from './Question';

const ChangeQuestion = () => {
  return (
    <BottomSheet isShowing={true}>
      <BottomSheetHandleIcon />
      <section css={QuestionListWrapperCss}>
        {BASIC_QUESTION_LIST.map((question, idx) => {
          // TODO 추후 서버에서 받아온 데이터로 key값 변경, 기본 질문 이외의 질문도 대응
          return <Question key={idx} question={question.title} />;
        })}
      </section>
    </BottomSheet>
  );
};

export default ChangeQuestion;

const QuestionListWrapperCss = css`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  max-height: 100%;
  padding-top: 10px;
`;
