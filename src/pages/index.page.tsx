import { type ReactElement } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import Logo from '~/assets/Logo';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import SEO from '~/components/SEO/SEO';
import ConditionalCtaLink from '~/features/home/ConditionalCtaLink';
import KakaoLoginButton from '~/features/home/KakaoLoginButton';
import { HEAD_2_BOLD } from '~/styles/typo';

export default function Home() {
  return (
    <>
      <SEO />

      <main css={wrapperCss}>
        <picture css={pictureCss}>
          <source srcSet="/images/home/home_bg.webp" type="image/webp" />
          <Image src="/images/home/home_bg.png" alt="na-lab" fill priority />
        </picture>

        <section css={headingWrapperCss}>
          <h1 css={titleCss}>나의 커리어 DNA 연구소</h1>
          <Logo css={logoCss} />
        </section>

        <section css={ctaWrapperCss}>
          <ConditionalCtaLink />
          <KakaoLoginButton />
        </section>
      </main>
    </>
  );
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

const wrapperCss = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100dvh;
`;

const headingWrapperCss = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
`;

const titleCss = css`
  ${HEAD_2_BOLD}

  margin-top: 80px;
  color: #fff;
`;

const logoCss = css`
  margin-top: 16px;
`;

const pictureCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.belowDefault};
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  height: 100%;
`;

const ctaWrapperCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;

  width: 100%;
  max-width: ${theme.size.maxWidth};
  padding-bottom: 36px;
`;
