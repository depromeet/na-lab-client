import { type ReactElement } from 'react';
import { css, type Theme } from '@emotion/react';

import Logo from '~/assets/Logo';
import CTAButton from '~/components/button/CTAButton';
import KakaoLoginButton from '~/components/kakaoLoginButton/KakaoLoginButton';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import SEO from '~/components/SEO/SEO';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import colors from '~/styles/color';
import { HEAD_2_BOLD } from '~/styles/typo';

export default function Home() {
  const router = useInternalRouter();

  return (
    <>
      <SEO />

      <main css={loginPageWrapperCss('/images/login/login.png')}>
        <div css={titleCss}>나의 커리어 DNA 연구소</div>
        <Logo css={logoCss} />
        <section css={ctaWrapperCss}>
          <CTAButton background-color={colors.secondary_200} onClick={() => router.push('/survey')}>
            질문 폼 생성으로 시작하기
          </CTAButton>
          <KakaoLoginButton />
        </section>
      </main>
    </>
  );
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

const loginPageWrapperCss = (loginBackgroundImage: string) => css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  height: 734px;

  background-image: url(${loginBackgroundImage});
`;

const titleCss = css`
  ${HEAD_2_BOLD}

  color: #fff;
  margin-top: 80px;
`;

const logoCss = css`
  margin-top: 16px;
`;

const ctaWrapperCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;

  width: 343px;
  max-width: ${theme.size.maxWidth};
  margin-top: 390px;
  padding: 0 23px;
`;
