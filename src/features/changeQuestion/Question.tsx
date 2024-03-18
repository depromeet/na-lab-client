import { type MouseEventHandler, useState } from 'react';
import { css, type Theme, useTheme } from '@emotion/react';

import { HEAD_2_REGULAR } from '~/styles/typo';

import CheckIcon from '../../components/icons/CheckIcon';
import QuestionIcon from './QuestionIcon';

interface Props {
  question: string;
}

const Question = ({ question }: Props) => {
  const theme = useTheme();

  const [isSelected, setIsSelected] = useState<boolean>(false);

  const onClickQuestion: MouseEventHandler<SVGSwitchElement> = (e) => {
    if (e) {
      setIsSelected(!isSelected);
    }
  };

  return (
    <switch css={QuestionWrapperCss(isSelected, theme)} onClick={onClickQuestion}>
      <span css={QuestionWrapperLeftCss}>
        <QuestionIcon />
        <div css={QuestionDescCss}>{question}</div>
      </span>
      {isSelected ? <CheckIcon /> : null}
    </switch>
  );
};

export default Question;

const QuestionWrapperCss = (isSelected: boolean, theme: Theme) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 74px;
  padding: 15px;

  background-color: ${isSelected ? theme.colors.primary_50 : theme.colors.white};
`;

const QuestionDescCss = css`
  ${HEAD_2_REGULAR}
  overflow: hidden;
  display: block;

  width: 250px;
  margin-left: 20px;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

const QuestionWrapperLeftCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
