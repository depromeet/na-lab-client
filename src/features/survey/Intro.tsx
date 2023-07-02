import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';
import introBgPng from 'public/images/intro/intro_bg.png';
import introBgWebp from 'public/images/intro/intro_bg.webp';

import CTAButton from '~/components/button/CTAButton';
import { useCTAButtonVisible, useParagraphStep } from '~/components/intro/hooks';
import IntroHeader from '~/components/intro/IntroHeader';
import SkipStaggerWrapper from '~/components/intro/SkipStaggerWrapper';
import WatsonCharacter from '~/components/watson/WatsonCharacter';
import { defaultFadeInVariants } from '~/constants/motions';
import { RESEARCHER_NAME } from '~/constants/name';
import { CTAVariants } from '~/features/survey/styles';

interface StepProps {
  next?: () => void;
  prev?: () => void;
}

const Intro = ({ next }: StepProps) => {
  const { currentStep, paragraphStep } = useParagraphStep();
  const { isCTAButtonVisible } = useCTAButtonVisible();

  if (currentStep === 4) {
    return (
      <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
        <picture css={pictureCss}>
          <source srcSet="/images/survey/intro-image-4.webp" type="image/webp" />
          <Image src="/images/survey/intro-image-4.png" alt="나의 질문 폼 생성" fill />
        </picture>

        <IntroHeader />

        <article css={articleCss}>
          <AnimatePresence mode="wait">
            {currentStep === 4 && <Paragraph4 key="4" onSkip={paragraphStep} />}
          </AnimatePresence>
        </article>

        {isCTAButtonVisible && (
          <m.div css={fixedBottomCss} variants={CTAVariants} initial="initial" animate="animate" exit="exit">
            <CTAButton onClick={next}>생성하기</CTAButton>
          </m.div>
        )}
      </m.section>
    );
  }

  return (
    <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
      <picture css={pictureCss}>
        <source srcSet={introBgWebp.src} type="image/webp" />
        <Image src={introBgPng} alt="nalab intro" fill />
      </picture>

      <IntroHeader />
      <article css={articleCss}>
        <AnimatePresence mode="wait">
          {[1, 2, 3].includes(currentStep) && (
            <>
              {currentStep === 1 && <Paragraph1 key="1" onSkip={paragraphStep} />}
              {currentStep === 2 && <Paragraph2 key="2" onSkip={paragraphStep} />}
              {currentStep === 3 && <Paragraph3 key="3" onSkip={paragraphStep} />}
            </>
          )}
        </AnimatePresence>
      </article>

      <WatsonCharacter />
    </m.section>
  );
};

export default Intro;

const articleCss = css`
  margin-bottom: 42px;
  padding-top: calc(126px - 56px);
`;

type SkipProps = { onSkip: () => void };

const Paragraph1 = ({ onSkip }: SkipProps) => {
  return (
    <SkipStaggerWrapper onSkip={onSkip}>
      <p>안녕하세요!</p>
      <p>저는 당신의 커리어 연구원</p>
      <p>
        <strong>{RESEARCHER_NAME}</strong>이에요.
      </p>
    </SkipStaggerWrapper>
  );
};

const Paragraph2 = ({ onSkip }: SkipProps) => {
  return (
    <SkipStaggerWrapper onSkip={onSkip}>
      <p>동료의 익명 피드백을 수집해서</p>
      <p>
        당신의 커리어 <strong>DNA</strong>를 찾는
      </p>
      <p>연구를 한답니다.</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph3 = ({ onSkip }: SkipProps) => {
  return (
    <SkipStaggerWrapper onSkip={onSkip}>
      <p>동료의 익명 피드백은</p>
      <p>
        <strong>나의 질문 폼</strong>을 만들고 공유해서
      </p>
      <p>수집할 수 있어요.</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph4 = ({ onSkip }: SkipProps) => {
  return (
    <SkipStaggerWrapper onSkip={onSkip}>
      <p>지금, 피드백을 받을 수 있는 </p>
      <p>
        <strong>나의 질문 폼</strong>을 생성해보세요!
      </p>
    </SkipStaggerWrapper>
  );
};

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

const sectionCss = (theme: Theme) => css`
  position: relative;
  z-index: ${theme.zIndex.aboveFixed};

  width: 100%;
  height: 100%;

  background-color: ${theme.colors.white};

  & strong {
    font-weight: bold;
    color: ${theme.colors.primary_300};
  }
`;

const fixedBottomCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.aboveFixed};
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  padding: 0 16px;
`;
