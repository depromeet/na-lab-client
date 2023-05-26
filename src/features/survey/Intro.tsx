import { type PropsWithChildren, useEffect } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import { defaultEasing } from '~/constants/motions';
import { RESEARCHER_NAME } from '~/constants/name';
import WatsonCharacter from '~/features/survey/intro/WatsonCharacter';
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
      <section css={characterContainerCss}>
        <m.div variants={imageVariant} initial="initial" animate="animate" exit="exit">
          <Image src="/images/intro/intro_question_create.png" width={254} height={284} alt="나의 질문폼" />
        </m.div>
      </section>
    </article>
  );
};

const WatsonContainer = ({ children }: PropsWithChildren) => {
  return (
    <article css={[backgroundCss, characterBackgroundCss]}>
      <section css={paragraphContainerCss}>{children}</section>
      <section css={characterContainerCss}>
        <m.div variants={imageVariant} initial="initial" animate="animate" exit="exit">
          <WatsonCharacter />
        </m.div>
      </section>
    </article>
  );
};

const imageVariant = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
};

const paragraphContainerCss = css`
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
`;

const characterContainerCss = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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

export const CTAVariants = {
  initial: {
    opacity: 0,
    y: 30,
    x: '-50%',
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    x: '-50%',
    transition: { duration: 0.5, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    y: 30,
    x: '-50%',
    transition: { duration: 0.5, ease: defaultEasing },
  },
};

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
