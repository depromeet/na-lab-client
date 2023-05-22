import { useEffect } from 'react';
import { css, type Theme } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import { defaultEasing } from '~/constants/motions';
import useBoolean from '~/hooks/common/useBoolean';
import useStep from '~/hooks/step/useStep';

import { fixedBottomCss } from '../style';
import { type StepProps } from './type';

const Intro = ({ next }: StepProps) => {
  const { currentStep } = useParagraphStep();
  const { isCTAButtonVisible } = useCTAButtonVisible();

  // TODO: section에 인터랙션 적용
  return (
    <section css={sectionCss}>
      <article css={articleCss}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && <Paragraph1 key="1" />}
          {currentStep === 2 && <Paragraph2 key="2" />}
          {currentStep === 3 && <Paragraph3 key="3" />}
          {currentStep === 4 && <Paragraph4 key="4" />}
        </AnimatePresence>
      </article>

      {isCTAButtonVisible && (
        <m.div css={fixedBottomCss} variants={CTAVariants} initial="initial" animate="animate" exit="exit">
          <CTAButton color="blue" onClick={next}>
            시작하기
          </CTAButton>
        </m.div>
      )}
    </section>
  );
};

export default Intro;

const sectionCss = (theme: Theme) => css`
  position: relative;
  width: 100%;

  & strong {
    font-weight: bold;
    color: ${theme.colors.primary_300};
  }
`;

const articleCss = css`
  padding-top: 126px;
`;

const CTAVariants = {
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

const Paragraph1 = () => {
  return (
    <StaggerWrapper>
      <p>안녕하세요!</p>
      <p>
        <strong>예진</strong>님의 커리어 DNA 연구소에
      </p>
      <p>오신 걸 환영해요.</p>
    </StaggerWrapper>
  );
};

const Paragraph2 = () => {
  return (
    <StaggerWrapper>
      <p>와우!</p>
      <p>당신이 우리 연구를 도우러 온</p>
      <p>
        <strong>새로운 연구원</strong>이군요.
      </p>
    </StaggerWrapper>
  );
};

const Paragraph3 = () => {
  return (
    <StaggerWrapper>
      <p>저는 당신을 이끌어 줄</p>
      <p>
        <strong>Dr. 왓슨</strong>이라고 해요.
      </p>
      <p>부담없이 따라와주세요!</p>
    </StaggerWrapper>
  );
};

const Paragraph4 = () => {
  return (
    <StaggerWrapper>
      <p>아! 모든 연구는 예진 님에게</p>
      <p>
        <strong>익명</strong>으로 비밀리에 전달되니
      </p>
      <p>걱정하지 마세요.</p>
    </StaggerWrapper>
  );
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
