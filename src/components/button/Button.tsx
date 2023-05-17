import { type ButtonHTMLAttributes, forwardRef, type Ref } from 'react';
import { css, type Theme, useTheme } from '@emotion/react';

import { HEAD_2_BOLD } from '~/styles/typo';

type Color = 'navy' | 'blue' | 'gray';
type ButtonAttr = ButtonHTMLAttributes<HTMLButtonElement>;

interface Props extends ButtonAttr {
  /**
   * @description 'navy' | 'blue' | 'gray' 중 색상을 지정할 수 있습니다.
   * @default 'navy'
   */
  color?: Color;
}

/**
 * @description 디자인 시스템의 `Rect Small` 버튼에 대응하는 기본 버튼 입니다.
 * padding `15.5px 68px`과 함께 폰트 사이즈 `HEAD_2_BOLD`가 적용되어 있습니다.
 */
const Button = forwardRef(function Button(
  { children, type = 'button', color = 'navy', ...rest }: Props,
  forwardedRef: Ref<HTMLButtonElement>,
) {
  const theme = useTheme();

  return (
    // eslint-disable-next-line react/button-has-type
    <button css={buttonCss(theme, color)} ref={forwardedRef} type={type} {...rest}>
      {children}
    </button>
  );
});

export default Button;

const buttonCss = (theme: Theme, color: Color) => css`
  all: unset;
  ${color === 'navy' && navyCss(theme)}
  ${color === 'blue' && blueCss(theme)}
  ${color === 'gray' && grayCss(theme)}

  ${HEAD_2_BOLD};

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15.5px 68px;

  border-radius: 8px;

  transition: color 0.3s ${theme.transition.defaultEasing}, background-color 0.3s ${theme.transition.defaultEasing};
`;

const navyCss = (theme: Theme) => css`
  color: ${theme.colors.white};
  background-color: ${theme.colors.secondary_200};

  &:hover {
    background-color: ${theme.colors.secondary_300};
  }

  &:disabled {
    background-color: ${theme.colors.secondary_100};
  }
`;

const blueCss = (theme: Theme) => css`
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary_200};

  &:hover {
    background-color: ${theme.colors.primary_300};
  }

  &:disabled {
    background-color: ${theme.colors.primary_100};
  }
`;

const grayCss = (theme: Theme) => css`
  color: ${theme.colors.gray_500};
  background-color: ${theme.colors.gray_50};

  &:hover {
    background-color: ${theme.colors.gray_100};
  }

  &:disabled {
    color: ${theme.colors.gray_300};
    background-color: ${theme.colors.gray_50};
  }
`;
