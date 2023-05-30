import { type InputHTMLAttributes } from 'react';
import { css, type Theme } from '@emotion/react';

const Checkbox = ({ children, ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label css={labelCss}>
      <input css={inputCss} type="checkbox" {...rest} />
      <span css={wrapperSpanCss}>
        {children}
        <span css={checkboxSpanCss} />
      </span>
    </label>
  );
};

export default Checkbox;

const labelCss = (theme: Theme) => css`
  width: 100%;
  height: 56px;

  & > input:checked + span {
    ${checkedSpanCss(theme)}
  }
`;

const inputCss = css`
  display: none;
  appearance: none;
`;

const wrapperSpanCss = (theme: Theme) => css`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  padding: 15.5px 16px;

  font-size: 18px;
  font-weight: 400;
  line-height: 140%;
  color: ${theme.colors.gray_500};

  background-color: ${theme.colors.primary_50};
  border-radius: 8px;

  transition: background-color 0.3s ${theme.transition.defaultEasing};
`;

const checkboxSpanCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;

  background-color: ${theme.colors.primary_100};
  border-radius: 50%;

  transition: background-color 0.3s ${theme.transition.defaultEasing};

  &::after {
    content: '';

    width: 10px;
    height: 10px;

    background-color: #f7f8f9;
    border-radius: 50%;
  }
`;

const checkedSpanCss = (theme: Theme) => css`
  background-color: rgb(99 143 255 / 20%);

  & > span {
    background-color: ${theme.colors.primary_200};
  }
`;
