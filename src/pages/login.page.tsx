import { css } from '@emotion/react';

import LogoBig from '~/assets/LogoBig';
import KakaoLoginButton from '~/components/kakaoLoginButton/KakaoLoginButton';
import colors from '~/styles/color';

export default function Login() {
  return (
    <div css={LoginPageWrapper}>
      <section className="page-top">
        <main className="title">나의 커리어 DNA 연구</main>
        <LogoBig />
      </section>
      <section className="page-bottom">
        <button type="button" css={StartButton}>
          질문 폼 생성으로 시작하기
        </button>
        <KakaoLoginButton />
      </section>
    </div>
  );
}

const LoginPageWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;

  .page-top {
    display: flex;
    flex-direction: column;
    flex-grow: 5;
    align-items: center;
    justify-content: center;

    .title {
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
    }
  }

  .page-bottom {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;

    .login-link-desc {
      margin: 10px;

      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: ${colors.primary_50};
    }

    .login-link {
      text-decoration: underline;
    }
  }
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
