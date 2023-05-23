import { type Dispatch, type SetStateAction } from 'react';
import { css, type Theme } from '@emotion/react';

import MinusIcon from '~/components/icons/MinusIcon';
import PlusIcon from '~/components/icons/PlusIcon';
import colors from '~/styles/color';
import { HEAD_3_SEMIBOLD } from '~/styles/typo';

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;

  maxValue?: number;
  minValue?: number;
}

const Counter = ({ value, setValue, maxValue, minValue }: Props) => {
  const onPlus = () => {
    if (maxValue && value >= maxValue) return;
    setValue((prev) => prev + 1);
  };

  const onMinus = () => {
    if (minValue && value <= minValue) return;
    setValue((prev) => prev - 1);
  };

  return (
    <div css={containerCss}>
      <button css={buttonCss} type="button" onClick={onMinus}>
        <MinusIcon color={colors.gray_500} />
      </button>
      <div css={valueCss}>{value}</div>
      <button css={buttonCss} type="button" onClick={onPlus}>
        <PlusIcon color={colors.gray_500} />
      </button>
    </div>
  );
};

export default Counter;

const containerCss = css`
  display: flex;
  align-items: center;
`;

const buttonCss = css`
  all: unset;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
`;

const valueCss = (theme: Theme) => css`
  ${HEAD_3_SEMIBOLD}

  width: 32px;
  color: ${theme.colors.primary_200};
  text-align: center;
`;
