import { css } from '@emotion/react';

import LogoBig from '~/assets/LogoBig';
import KakaoLoginButton from '~/components/kakaoLoginButton/KakaoLoginButton';
import colors from '~/styles/color';

export default function Login() {
  return (
    <main css={LoginPageWrapper}>
      <section css={LoginPageTopSection}>
        <h1 css={TitleCss}>나의 커리어 DNA 연구</h1>
        <LogoBig />
      </section>
      <section css={LoginPageBottomSection}>
        <button type="button" css={StartButton}>
          질문 폼 생성으로 시작하기
        </button>
        <KakaoLoginButton />
      </section>
    </main>
  );
}

const LoginPageWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

const LoginPageTopSection = css`
  display: flex;
  flex-direction: column;
  flex-grow: 5;
  align-items: center;
  justify-content: center;
`;

const LoginPageBottomSection = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const TitleCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 10px;

  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
  line-height: 138%;
  color: ${colors.black};
  letter-spacing: -0.3px;
`;

const StartButton = css`
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
