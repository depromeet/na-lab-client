import { type ChangeEventHandler } from 'react';
import { css, type Theme, useTheme } from '@emotion/react';

import CheckIcon from '~/components/icons/CheckIcon';

import { type Position } from '../type';

interface Props {
  value: Position;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  checkedColor: string;
}

const Checkbox = ({ value, checked, onChange, checkedColor }: Props) => {
  const theme = useTheme();

  return (
    <label css={labelCss(theme, checkedColor)}>
      <input css={inputCss} type="checkbox" checked={checked} onChange={onChange} value={value} />
      <span>
        <CheckIcon color={theme.colors.white} />
      </span>
    </label>
  );
};

export default Checkbox;

const labelCss = (theme: Theme, checkedColor: string) => css`
  position: absolute;
  z-index: 1;
  right: 20px;
  bottom: 20px;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    height: 36px;

    background-color: ${theme.colors.gray_200};
    border-radius: 50%;

    transition: background-color 0.3s ${theme.transition.defaultEasing};
  }

  & > input:checked + span {
    background-color: ${checkedColor};
  }
`;

const inputCss = css`
  display: none;
  appearance: none;
`;
