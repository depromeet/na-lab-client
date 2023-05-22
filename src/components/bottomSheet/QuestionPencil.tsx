import { css } from '@emotion/react';

import colors from '~/styles/color';

import EditIcon from '../icons/EditIcon';

const QuestionPencil = ({ color = 'bluegreen' }) => {
  return (
    <div css={QuestionPencilWrapper(color)}>
      <EditIcon />
    </div>
  );
};

export default QuestionPencil;

const styles: Record<string, Record<string, string>> = {
  bluegreen: {
    backgroundColor: colors.bluegreen,
  },
  pink: {
    backgroundColor: colors.pink,
  },
};

const QuestionPencilWrapper = (color: string) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 10px;
  ${styles[color]}
`;
