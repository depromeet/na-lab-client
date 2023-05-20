import { css } from '@emotion/react';

import colors from '~/styles/color';

const QuestionPencil = () => {
  return <div css={QuestionPencilWrapper}></div>;
};
// TODO: icon 추가를 main에 머지하고 나서 연필 아이콘 삽입 작업하기
// TODO: 핑크색 배경도 만들어야함 props에 따라 다르게 렌더링 필요
export default QuestionPencil;

const QuestionPencilWrapper = css`
  width: 50px;
  height: 50px;
  background-color: ${colors.bluegreen};
  border-radius: 10px;
`;
