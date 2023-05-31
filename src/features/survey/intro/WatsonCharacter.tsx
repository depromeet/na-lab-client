import { css } from '@emotion/react';
import { m } from 'framer-motion';

const WatsonCharacter = () => {
  return (
    <m.article css={containerCss}>
      {/* TODO : lottie로 대체 */}
      <m.div variants={imageVariant} initial="init" animate="animate">
        <WatsonImage />
        {/* <Image src="/images/intro/watson_character.png" width={147} height={132} alt="watson" /> */}
      </m.div>

      <m.div css={shadowCss} animate={shadowAnimate} transition={transition}>
        <WatsonShadow />
      </m.div>
    </m.article>
  );
};

export default WatsonCharacter;

const transition = { duration: 1.8, ease: 'easeIn', repeat: Infinity, repeatDelay: 0.4 };

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

// TODO : lottie로 대체
const WatsonImage = () => {
  return (
    <svg width="148" height="133" viewBox="0 0 148 133" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="73.9375" cy="74.0801" rx="58" ry="52" fill="url(#paint0_linear_2117_45714)" fill-opacity="0.3" />
      <ellipse
        cx="73.5335"
        cy="66.3245"
        rx="62.1941"
        ry="52"
        transform="rotate(-15 73.5335 66.3245)"
        fill="url(#paint1_linear_2117_45714)"
        fill-opacity="0.2"
      />
      <ellipse cx="70" cy="71" rx="52" ry="43" fill="url(#paint2_linear_2117_45714)" />
      <g filter="url(#filter0_b_2117_45714)">
        <ellipse cx="70.5" cy="71.5" rx="54.5" ry="46.5" fill="white" fill-opacity="0.05" />
      </g>
      <circle cx="23.9375" cy="35.0801" r="2" fill="#A3BCFF" />
      <circle cx="85.9375" cy="20.0801" r="2" fill="#A3BCFF" />
      <circle cx="112.938" cy="34.0801" r="1" fill="#A3BCFF" />
      <circle cx="75.9375" cy="17.0801" r="1" fill="#BDC6DF" />
      <circle cx="59.9375" cy="22.0801" r="1" fill="#A3BCFF" />
      <circle cx="16.9375" cy="40.0801" r="1" fill="#A3BCFF" />
      <circle cx="29.9375" cy="23.0801" r="1" fill="#DEF3EC" />
      <circle cx="92.9375" cy="4.08008" r="1" fill="#F2F9DA" />
      <circle cx="48.9375" cy="8.08008" r="1" fill="#FEECE2" />
      <rect x="40.9375" y="56.0801" width="6" height="13" rx="3" fill="white" />
      <rect x="62.9375" y="56.0801" width="6" height="13" rx="3" fill="white" />
      <defs>
        <filter
          id="filter0_b_2117_45714"
          x="6"
          y="15"
          width="129"
          height="113"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2117_45714" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2117_45714" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_2117_45714"
          x1="73.4808"
          y1="22.0801"
          x2="89.7248"
          y2="126.537"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.452452" stop-color="#638FFF" />
          <stop offset="1" stop-color="#EEFFB4" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2117_45714"
          x1="62.2212"
          y1="20.413"
          x2="89.0372"
          y2="119.562"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#638FFF" />
          <stop offset="0.555611" stop-color="#F3E0F9" />
          <stop offset="1" stop-color="#F0FAD0" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2117_45714"
          x1="69.5906"
          y1="28"
          x2="82.0237"
          y2="114.683"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.28614" stop-color="#638FFF" />
          <stop offset="0.795166" stop-color="#96B5F2" />
          <stop offset="1" stop-color="#F0FAD0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
