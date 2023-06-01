import { css } from '@emotion/react';

import Logo from '~/assets/Logo';
import XIcon from '~/components/icons/XIcon';
import KakaoLoginButton from '~/components/kakaoLoginButton/KakaoLoginButton';
import colors from '~/styles/color';
import { HEAD_2_BOLD } from '~/styles/typo';

export default function Login() {
  return (
    <main css={loginPageWrapperCss}>
      <XIcon css={xIconCss} />
      <Logo css={logoCss} />
      <button type="button" css={startButtonCss}>
        질문 폼 생성으로 시작하기
      </button>
      <KakaoLoginButton />
    </main>
  );
}

const loginPageWrapperCss = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 375px;
  height: 812px;
`;

const xIconCss = css`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const logoCss = css`
  margin-top: 176px;
`;

const startButtonCss = css`
  cursor: pointer;

  overflow: visible;

  width: 327px;
  height: 56px;
  padding: 0;
  margin-top: 404px;
  margin-bottom: 11px;

  color: ${colors.white};
  ${HEAD_2_BOLD}

  background-color: ${colors.primary};
  border: none;
  border-radius: 8px;
  box-shadow: none;
`;
