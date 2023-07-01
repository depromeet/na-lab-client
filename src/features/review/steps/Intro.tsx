import { Children, type PropsWithChildren, useEffect, useRef } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { AnimatePresence, type AnimationPlaybackControls, m, stagger, useAnimate, type Variants } from 'framer-motion';
import introBgPng from 'public/images/intro/intro_bg.png';
import introBgWebp from 'public/images/intro/intro_bg.webp';

import CTAButton from '~/components/button/CTAButton';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import WatsonCharacter from '~/components/watson/WatsonCharacter';
import { defaultEasing, defaultFadeInVariants } from '~/constants/motions';
import useBoolean from '~/hooks/common/useBoolean';
import useDidMount from '~/hooks/lifeCycle/useDidMount';
import useStep from '~/hooks/step/useStep';
import { HEAD_1 } from '~/styles/typo';
import recordEvent from '~/utils/event';

import { fixedBottomCss } from '../style';
import IntroHeader from './intro/IntroHeader';
import { type StepProps } from './type';

interface Props extends StepProps {
  nickname: Reviewer['nickname'];
}

const Intro = ({ nickname, next }: Props) => {
  const { currentStep, paragraphStep } = useParagraphStep();
  const { isCTAButtonVisible } = useCTAButtonVisible();

  useDidMount(() => {
    recordEvent({ action: '리뷰어 - 인트로' });
  });

  return (
    <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
      <picture css={pictureCss}>
        <source srcSet={introBgWebp.src} type="image/webp" />
        <Image src={introBgPng} alt="nalab intro" fill />
      </picture>

      <IntroHeader />

      <article css={articleCss}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && <Paragraph1 key="1" nickname={nickname} next={paragraphStep} />}
          {currentStep === 2 && <Paragraph2 key="2" next={paragraphStep} />}
          {currentStep === 3 && <Paragraph3 key="3" />}
          {currentStep === 4 && <Paragraph4 key="4" nickname={nickname} />}
        </AnimatePresence>
      </article>

      <WatsonCharacter />

      {isCTAButtonVisible && (
        <m.div css={fixedBottomCss} variants={CTAVariants}>
          <CTAButton color="blue" onClick={() => next?.()}>
            시작하기
          </CTAButton>
        </m.div>
      )}
    </m.section>
  );
};

export default Intro;

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

const articleCss = css`
  margin-bottom: 42px;
  padding-top: 126px;
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

  & > img {
    object-fit: cover;
  }
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
    paragraphStep,
  };
};

type NicknameProps = Pick<Props, 'nickname'>;

const Paragraph1 = ({ nickname, next }: NicknameProps & { next: () => void }) => {
  return (
    <StaggerW onSkip={next}>
      <p>안녕하세요!</p>
      <p>
        <strong>{nickname}</strong>님의 커리어 DNA 연구소에
      </p>
      <p>오신 걸 환영해요.</p>
    </StaggerW>
  );
};

const Paragraph2 = ({ next }: { next: () => void }) => {
  return (
    <StaggerW onSkip={next}>
      <p>와우!</p>
      <p>당신이 우리 연구를 도우러 온</p>
      <p>
        <strong>새로운 연구원</strong>이군요.
      </p>
    </StaggerW>
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

const Paragraph4 = ({ nickname }: NicknameProps) => {
  return (
    <StaggerWrapper>
      <p>아! 모든 연구는 {nickname} 님에게</p>
      <p>
        <strong>익명</strong>으로 비밀리에 전달되니
      </p>
      <p>걱정하지 마세요.</p>
    </StaggerWrapper>
  );
};

const StaggerW = ({ children, onSkip }: PropsWithChildren<{ onSkip?: () => void }>) => {
  const [scope, animate] = useAnimate();
  const animation = useRef<null | AnimationPlaybackControls>(null);

  useEffect(() => {
    animation.current = animate('div', { opacity: 1, scale: 1, y: [10, 0] }, { duration: 0.5, delay: stagger(0.5) });
  }, []);

  const onClick = async () => {
    animation.current = await animate('div', { opacity: 1, scale: 1, y: [1, 0] }, { duration: 0.1 });
    setTimeout(function () {
      onSkip && onSkip();
    }, 500);
  };

  return (
    <m.article ref={scope} css={wrapperCss} onClick={onClick}>
      {Children.toArray(children).map((paragraph, index) => (
        <m.div key={index} css={HEAD_1} variants={fadeInUpVariants}>
          {paragraph}
        </m.div>
      ))}
    </m.article>
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
const wrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const fadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
};
