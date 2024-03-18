import { css, type Theme } from '@emotion/react';
import { useAtomValue } from 'jotai';

import PlusIcon from '~/components/icons/PlusIcon';
import { surveyDeleteModeAtom } from '~/store/surveyDeleteMode';
import { HEAD_3_SEMIBOLD } from '~/styles/typo';

interface Props {
  onAction: () => void;
}

const AddMyQuestion = ({ onAction }: Props) => {
  const isDeleteMode = useAtomValue(surveyDeleteModeAtom);

  return (
    <button disabled={isDeleteMode} type="button" css={(theme) => containerCss(theme)} onClick={onAction}>
      <div className="icon-container" css={actionPlusCss}>
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
  border-radius: 2.5rem;
`;

const containerCss = (theme: Theme) => css`
  cursor: pointer;
  user-select: none;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 110px;
  margin: 0.5rem 0;
  padding: 0.75rem 0;

  background: ${theme.colors.primary_50};
  border: 1px dashed ${theme.colors.primary_100};
  border-radius: 0.5rem;

  &:hover {
    background: ${theme.colors.primary_100};
    transition: background 0.2s ease-in-out;

    .icon-container {
      background: ${theme.colors.primary_50};
      transition: background 0.2s ease-out;
      transition-delay: 0.1s;
    }
  }

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const textCss = (theme: Theme) => css`
  ${HEAD_3_SEMIBOLD};
  color: ${theme.colors.primary_300};
`;
