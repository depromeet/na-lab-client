import { css, type Theme } from '@emotion/react';

import PlusIcon from '~/components/icons/PlusIcon';
import { HEAD_3_SEMIBOLD } from '~/styles/typo';

interface Props {
  onAction: () => void;
}

const AddMyQuestion = ({ onAction }: Props) => {
  return (
    <button type="button" css={containerCss} onClick={onAction}>
      <div css={actionPlusCss}>
        <PlusIcon />
      </div>
      <span css={textCss}>나만의 질문 추가하기</span>
    </button>
  );
};

export default AddMyQuestion;

const actionPlusCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  background: ${theme.colors.primary_100};
  border-radius: 40px;
`;

const containerCss = (theme: Theme) => css`
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 110px;
  padding: 12px 0;

  background: ${theme.colors.primary_50};
  border: 1px dashed ${theme.colors.primary_100};
  border-radius: 8px;
`;

const textCss = (theme: Theme) => css`
  ${HEAD_3_SEMIBOLD};

  color: ${theme.colors.primary_300};
`;
