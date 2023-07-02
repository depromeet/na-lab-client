import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import introBgPng from 'public/images/intro/intro_bg.png';
import introBgWebp from 'public/images/intro/intro_bg.webp';

import WatsonCharacter from '~/components/watson/WatsonCharacter';

const IntroBackground = () => {
  return (
    <>
      <picture css={pictureCss}>
        <source srcSet={introBgWebp.src} type="image/webp" />
        <Image src={introBgPng} alt="nalab intro" fill />
      </picture>

      <WatsonCharacter />
    </>
  );
};

export default IntroBackground;

const pictureCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.belowDefault};
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  height: 100%;

  & > img {
    object-fit: cover;
  }
`;
