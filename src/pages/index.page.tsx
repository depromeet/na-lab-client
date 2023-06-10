import { type ReactElement } from 'react';
import { css } from '@emotion/react';

import Logo from '~/assets/Logo';
import CTAButton from '~/components/button/CTAButton';
import KakaoLoginButton from '~/components/kakaoLoginButton/KakaoLoginButton';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';

export default function Home() {
  return (
    <main css={loginPageWrapperCss}>
      <Logo css={logoCss} />

      <section css={ctaWrapperCss}>
        <CTAButton color="blue">질문 폼 생성으로 시작하기</CTAButton>
        <KakaoLoginButton />
      </section>
    </main>
  );
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

const loginPageWrapperCss = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100dvh;
`;

const logoCss = css`
  margin-top: 176px;
`;

const ctaWrapperCss = css`
  position: fixed;
  bottom: 36px;

  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;

  width: 100%;
  padding: 0 23px;
`;
