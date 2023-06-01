import { type PropsWithChildren, useEffect } from 'react';
import { css, type Theme } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import { RESEARCHER_NAME } from '~/constants/name';
import WatsonCharacter from '~/features/survey/intro/WatsonCharacter';
import { centerContainerCss, CTAVariants, imageVariant, paragraphContainerCss } from '~/features/survey/styles';
import useBoolean from '~/hooks/common/useBoolean';
import useStep from '~/hooks/step/useStep';

interface StepProps {
  next?: () => void;
  prev?: () => void;
}

const Intro = ({ next }: StepProps) => {
  const { currentStep } = useParagraphStep();
  const { isCTAButtonVisible } = useCTAButtonVisible();

  return (
    <section css={sectionCss}>
      <AnimatePresence mode="wait">
        {[1, 2, 3].includes(currentStep) && (
          <WatsonContainer>
            {currentStep === 1 && <Paragraph1 key="1" />}
            {currentStep === 2 && <Paragraph2 key="2" />}
            {currentStep === 3 && <Paragraph3 key="3" />}
          </WatsonContainer>
        )}

        {currentStep === 4 && <Paragraph4 key="4" />}
      </AnimatePresence>

      {isCTAButtonVisible && (
        <m.div css={fixedBottomCss} variants={CTAVariants} initial="initial" animate="animate" exit="exit">
          <CTAButton onClick={next}>생성하기</CTAButton>
        </m.div>
      )}
    </section>
  );
};

export default Intro;

const Paragraph1 = () => {
  return (
    <StaggerWrapper>
      <p>안녕하세요!</p>
      <p>저는 당신의 커리어 연구원</p>
      <p>
        <strong>{RESEARCHER_NAME}</strong>이에요.
      </p>
    </StaggerWrapper>
  );
};

const Paragraph2 = () => {
  return (
    <StaggerWrapper>
      <p>동료의 익명 피드백을 수집해서</p>
      <p>
        당신의 커리어 <strong>DNA</strong>를 찾는
      </p>
      <p>연구를 한답니다.</p>
    </StaggerWrapper>
  );
};

const Paragraph3 = () => {
  return (
    <StaggerWrapper>
      <p>동료의 익명 피드백은</p>
      <p>
        <strong>나의 질문 폼</strong>을 만들고 공유해서
      </p>
      <p>수집할 수 있어요.</p>
    </StaggerWrapper>
  );
};

const Paragraph4 = () => {
  return (
    <article css={backgroundCss}>
      <section css={paragraphContainerCss}>
        <StaggerWrapper>
          <p>지금, 피드백을 받을 수 있는</p>
          <p>
            <strong>나의 질문 폼</strong>을 생성해보세요!
          </p>
        </StaggerWrapper>
      </section>
      <section css={centerContainerCss}>
        <m.div variants={imageVariant} initial="initial" animate="animate" exit="exit">
          <Image4 />
          {/* <Image src="/images/intro/intro_question_create.png" width={254} height={284} alt="나의 질문폼" /> */}
        </m.div>
      </section>
    </article>
  );
};

const WatsonContainer = ({ children }: PropsWithChildren) => {
  return (
    <article css={[backgroundCss, characterBackgroundCss]}>
      <section css={paragraphContainerCss}>{children}</section>
      <section css={centerContainerCss}>
        <m.div variants={imageVariant} initial="initial" animate="animate" exit="exit">
          <WatsonCharacter />
        </m.div>
      </section>
    </article>
  );
};

const backgroundCss = css`
  width: 100%;
  height: 100vh;
`;

const characterBackgroundCss = css`
  background-image: url('/images/intro/intro_bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

// NOTE : intro 공통

const sectionCss = (theme: Theme) => css`
  position: relative;
  width: 100%;

  & strong {
    font-weight: bold;
    color: ${theme.colors.primary_300};
  }
`;
const fixedBottomCss = (theme: Theme) => css`
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  padding: 0 16px;
`;

const 문구_수 = 4;
const 매_문구_지속시간 = 3500;

const useParagraphStep = () => {
  const { currentStep, next: paragraphStep } = useStep({ initial: 1, max: 문구_수 });

  useEffect(() => {
    const interval = setInterval(paragraphStep, 매_문구_지속시간);

    return () => {
      clearInterval(interval);
    };
  }, [paragraphStep]);

  return {
    currentStep,
  };
};

const useCTAButtonVisible = () => {
  const [isCTAButtonVisible, _, setTrue] = useBoolean(false);

  useEffect(() => {
    const timeout = setTimeout(setTrue, 매_문구_지속시간 * 문구_수);

    return () => {
      clearTimeout(timeout);
    };
  }, [setTrue]);

  return { isCTAButtonVisible };
};

// TODO : 추후 이미지로 대체
const Image4 = () => {
  return (
    <svg width="255" height="284" viewBox="0 0 255 284" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="47" width="155" height="55" rx="1" fill="#F1F4FA" />
      <rect x="20" y="43" width="209" height="75" rx="1" fill="url(#paint0_linear_1652_38534)" />
      <rect x="47" y="124" width="155" height="56" rx="1" fill="#F1F4FA" />
      <rect x="47" y="186" width="155" height="55" rx="1" fill="url(#paint1_linear_1652_38534)" fill-opacity="0.8" />
      <rect x="83" y="72" width="88" height="6" fill="#B9C2D9" />
      <rect x="83" y="83" width="65" height="6" fill="#B9C2D9" />
      <path
        d="M58.6847 85.576C59.3754 85.576 60.0381 85.4547 60.6727 85.212L57.9567 82.888L60.7007 79.808L63.3607 82.216C63.5847 81.6373 63.6967 81.0027 63.6967 80.312V80.256C63.6967 79.5467 63.5754 78.8747 63.3327 78.24C63.0901 77.5867 62.7447 77.0173 62.2967 76.532C61.8487 76.028 61.3074 75.636 60.6727 75.356C60.0567 75.0573 59.3754 74.908 58.6287 74.908C57.8821 74.908 57.2007 75.0573 56.5847 75.356C55.9874 75.636 55.4647 76.0187 55.0167 76.504C54.5874 76.9893 54.2514 77.5493 54.0087 78.184C53.7847 78.8187 53.6727 79.4907 53.6727 80.2V80.256C53.6727 80.9653 53.7941 81.6467 54.0367 82.3C54.2794 82.9347 54.6154 83.4947 55.0447 83.98C55.4927 84.4653 56.0247 84.8573 56.6407 85.156C57.2567 85.436 57.9381 85.576 58.6847 85.576ZM64.5927 88.656C63.7527 89.1973 62.8287 89.6267 61.8207 89.944C60.8127 90.2427 59.7487 90.392 58.6287 90.392C57.1167 90.392 55.7167 90.1307 54.4287 89.608C53.1407 89.0667 52.0301 88.3387 51.0967 87.424C50.1634 86.5093 49.4261 85.436 48.8847 84.204C48.3621 82.972 48.1007 81.656 48.1007 80.256V80.2C48.1007 78.8 48.3621 77.484 48.8847 76.252C49.4261 75.0013 50.1727 73.9187 51.1247 73.004C52.0767 72.0707 53.1967 71.3427 54.4847 70.82C55.7727 70.2787 57.1727 70.008 58.6847 70.008C60.1967 70.008 61.5967 70.2787 62.8847 70.82C64.1727 71.3427 65.2834 72.0613 66.2167 72.976C67.1501 73.8907 67.8781 74.964 68.4007 76.196C68.9421 77.428 69.2127 78.744 69.2127 80.144V80.2C69.2127 81.2453 69.0634 82.244 68.7647 83.196C68.4661 84.148 68.0367 85.0253 67.4767 85.828L69.4927 87.536L66.7487 90.588L64.5927 88.656ZM71.2103 84.54H76.7543V90H71.2103V84.54Z"
        fill="#B9C2D9"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M214.095 95.6932C213.353 95.4883 212.668 96.1636 212.861 96.9087L220.921 127.921C221.115 128.666 222.042 128.923 222.591 128.382L230.799 120.297L238.693 128.312C239.081 128.705 239.714 128.71 240.108 128.323L245.095 123.41C245.488 123.023 245.493 122.39 245.105 121.996L237.211 113.981L245.419 105.896C245.967 105.356 245.725 104.425 244.983 104.22L214.095 95.6932Z"
        fill="#BFCAE8"
      />
      <path
        d="M29 205C29 204.448 29.4477 204 30 204H183C183.552 204 184 204.448 184 205V234L159 259L30 259C29.4477 259 29 258.552 29 258V205Z"
        fill="#F2F9DA"
      />
      <path d="M184 234L159 259V234H184Z" fill="#E0E9C1" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M40.6332 241.693C41.3752 241.488 42.0607 242.164 41.8671 242.909L33.8075 273.921C33.6139 274.666 32.6863 274.923 32.1379 274.382L23.9298 266.297L16.035 274.312C15.6475 274.705 15.0143 274.71 14.6209 274.323L9.63392 269.41C9.24046 269.023 9.23569 268.39 9.62325 267.996L17.518 259.981L9.30984 251.896C8.76142 251.356 9.00344 250.425 9.74549 250.22L40.6332 241.693Z"
        fill="#BFCAE8"
      />
      <rect x="65" y="224" width="66" height="5" fill="#E0E9C1" />
      <rect x="65" y="234" width="48.75" height="5" fill="#E0E9C1" />
      <circle cx="179" cy="209" r="15" fill="#D4DAE4" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M181 201C181 200.448 180.552 200 180 200H178C177.448 200 177 200.448 177 201V207L171 207C170.448 207 170 207.448 170 208V210C170 210.552 170.448 211 171 211L177 211V217C177 217.552 177.448 218 178 218H180C180.552 218 181 217.552 181 217V211L187 211C187.552 211 188 210.552 188 210V208C188 207.448 187.552 207 187 207L181 207V201Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1652_38534"
          x1="124.5"
          y1="43"
          x2="124.5"
          y2="125.584"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D6E1FC" />
          <stop offset="1" stop-color="#F3F3FA" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1652_38534"
          x1="124.5"
          y1="186"
          x2="124.5"
          y2="241"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F1F4FA" />
          <stop offset="1" stop-color="#F3F7FC" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
