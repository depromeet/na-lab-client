import { css } from '@emotion/react';

import { BASIC_QUESTION_LIST } from '~/features/createSurvey/constants';
import QuestionList from '~/features/createSurvey/questionList/QuestionList';

const CreateSurvey = () => {
  // const [cardItems, setCardItems] = useState<CardItemType[]>([]);

  // // TODO : 서버 API 명세서 참고해서 type 변경
  // const handleNewItemAdd = () => {
  //   setCardItems((prev) => {
  //     const newId = prev.length;

  //     return [
  //       ...prev,
  //       {
  //         id: newId,
  //         title: `나의 질문 ${newId}`,
  //         type: 'CHOICE',
  //       },
  //     ];
  //   });
  // };

  // CardList Component는 추후에 제거 예정 -> QuestionList로 대체
  return (
    <section css={containerCss}>
      <h1>기본 질문</h1>
      <QuestionList list={BASIC_QUESTION_LIST} />
    </section>
  );
};

export default CreateSurvey;

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// const buttonCss = css`
//   all: unset;

//   cursor: pointer;

//   display: flex;
//   flex-direction: column;
//   gap: 11px;
//   align-items: center;
//   justify-content: center;

//   width: 100%;
//   padding: 25px 106px;

//   color: #37c3ff;

//   background-color: #f7f8f9;
//   border-radius: 12px;
// `;
