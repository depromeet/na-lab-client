import { type Dispatch, type SetStateAction } from 'react';
import { css, type Theme } from '@emotion/react';

import Counter from '~/features/createSurvey/addSurvey/choiceForm/Counter';
import { BODY_2_BOLD } from '~/styles/typo';

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const MaximumSelect = ({ value, setValue }: Props) => {
  return (
    <div css={containerCss}>
      <span>최대 선택 개수</span>
      <Counter value={value} setValue={setValue} minValue={1} maxValue={19} />
    </div>
  );
};

export default MaximumSelect;

const containerCss = (theme: Theme) => css`
  ${BODY_2_BOLD}

  width: 207px;

  display: flex;
  gap: 23px;
  align-items: center;

  padding: 12px 16px;

  color: ${theme.colors.gray_400};

  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray_100};
  border-radius: 8px;
`;
