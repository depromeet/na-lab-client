import { css } from '@emotion/react';

import Logo from '~/assets/Logo';
import XIcon from '~/components/icons/XIcon';
import KakaoLoginButton from '~/components/kakaoLoginButton/KakaoLoginButton';
import colors from '~/styles/color';

export default function Login() {
  return (
    <main css={loginPageWrapperCss}>
      <XIcon css={xIconCss} />
      <section css={loginPageTopSectionCss}>
        <Logo css={logoCss} />
      </section>
      <section css={loginPageBottomSectionCss}>
        <button type="button" css={startButtonCss}>
          질문 폼 생성으로 시작하기
        </button>
        <KakaoLoginButton />
      </section>
    </main>
  );
}

const loginPageWrapperCss = css`
  /* display: flex;
  flex-direction: column; */

  /* align-items: center;
  justify-content: center; */

  height: 100vh;
  background-color: red;
`;

const xIconCss = css`
  position: absolute;
  top: 10;
  right: 10;
`;

const loginPageTopSectionCss = css`
  display: flex;
  flex-direction: column;
  flex-grow: 5;
  align-items: center;
  justify-content: center;
`;

const logoCss = css`
  margin-top: 176px;
`;

const loginPageBottomSectionCss = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const startButtonCss = css`
  cursor: pointer;

  overflow: visible;

  width: 327px;
  height: 56px;
  padding: 0;

  font-size: 18px;
  font-weight: 500;
  color: ${colors.white};

  background-color: ${colors.primary};
  border: none;
  border-radius: 8px;
  box-shadow: none;
`;
