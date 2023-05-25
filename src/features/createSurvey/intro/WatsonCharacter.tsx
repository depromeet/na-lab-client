import Image from 'next/image';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

import { defaultEasing } from '~/constants/motions';

const WatsonCharacter = () => {
  return (
    <m.article css={containerCss} exit={articleExit}>
      {/* TODO : lottie로 대체 */}
      <m.div variants={imageVariant} initial="init" animate="animate">
        <Image src="/images/watson_character.png" width={147} height={132} alt="watson" />
      </m.div>

      <m.div css={shadowCss} animate={shadowAnimate} transition={transition}>
        <WatsonShadow />
      </m.div>
    </m.article>
  );
};

export default WatsonCharacter;

const transition = { duration: 1.8, ease: 'easeIn', repeat: Infinity, repeatDelay: 0.4 };

const articleExit = {
  y: 10,
  opacity: 0,
  transition: { duration: 0.5, ease: defaultEasing },
};

const imageVariant = {
  init: {
    y: 0,
    scale: 1,
  },
  animate: {
    y: [0, -1, -2, -1, 0],
    scale: [1, 1.01, 1.02, 1.01, 1],
    transition: transition,
  },
};

const shadowAnimate = {
  scale: [1, 1.2, 1.3, 1.3, 1.2, 1],
};

const containerCss = css`
  position: relative;
`;

const shadowCss = css`
  position: absolute;
  top: 90%;
  right: 0;
  left: 0;

  text-align: center;
`;

const WatsonShadow = () => {
  return (
    <svg width="105" height="19" viewBox="0 0 105 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="52.5" cy="9.5" rx="52.5" ry="9.5" fill="url(#paint0_radial_2117_45831)" fill-opacity="0.5" />
      <defs>
        <radialGradient
          id="paint0_radial_2117_45831"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(52.5 9.5) rotate(90) scale(9.5 52.5)"
        >
          <stop stop-color="#A2BCFF" />
          <stop offset="1" stop-color="#F2F9DA" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
