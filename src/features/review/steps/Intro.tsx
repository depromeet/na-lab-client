import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';
import introBgPng from 'public/images/intro/intro_bg.png';
import introBgWebp from 'public/images/intro/intro_bg.webp';

import CTAButton from '~/components/button/CTAButton';
import { useCTAButtonVisible, useParagraphStep } from '~/components/intro/hooks';
import SkipStaggerWrapper from '~/components/intro/SkipStaggerWrapper';
import WatsonCharacter from '~/components/watson/WatsonCharacter';
import { defaultEasing, defaultFadeInVariants } from '~/constants/motions';
import useDidMount from '~/hooks/lifeCycle/useDidMount';
import recordEvent from '~/utils/event';

import IntroHeader from '../../../components/intro/IntroHeader';
import { fixedBottomCss } from '../style';
import { type StepProps } from './type';

interface Props extends StepProps {
  nickname: Reviewer['nickname'];
}

const Intro = ({ nickname, next }: Props) => {
  const { currentStep, paragraphStep: onSkip } = useParagraphStep();
  console.log('currentStep: ', currentStep);
  const { isCTAButtonVisible, skip: onCTAButtonVisibleSkip } = useCTAButtonVisible();

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
          {currentStep === 1 && <Paragraph1 key="1" nickname={nickname} onSkip={onSkip} />}
          {currentStep === 2 && <Paragraph2 key="2" onSkip={onSkip} />}
          {currentStep === 3 && <Paragraph3 key="3" onSkip={onSkip} />}
          {currentStep === 4 && <Paragraph4 key="4" nickname={nickname} onSkip={onCTAButtonVisibleSkip} />}
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

type NicknameProps = Pick<Props, 'nickname'>;
type SkipProps = { onSkip: () => void };

const Paragraph1 = ({ nickname, onSkip }: NicknameProps & SkipProps) => {
  return (
    <SkipStaggerWrapper onSkip={onSkip}>
      <p>안녕하세요!</p>
      <p>
        <strong>{nickname}</strong>님의 커리어 DNA 연구소에
      </p>
      <p>오신 걸 환영해요.</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph2 = ({ onSkip }: SkipProps) => {
  return (
    <SkipStaggerWrapper onSkip={onSkip}>
      <p>와우!</p>
      <p>당신이 우리 연구를 도우러 온</p>
      <p>
        <strong>새로운 연구원</strong>이군요.
      </p>
    </SkipStaggerWrapper>
  );
};

const Paragraph3 = ({ onSkip }: SkipProps) => {
  return (
    <SkipStaggerWrapper onSkip={onSkip}>
      <p>저는 당신을 이끌어 줄</p>
      <p>
        <strong>Dr. 왓슨</strong>이라고 해요.
      </p>
      <p>부담없이 따라와주세요!</p>
    </SkipStaggerWrapper>
  );
};

const Paragraph4 = ({ nickname, onSkip }: NicknameProps & SkipProps) => {
  return (
    <SkipStaggerWrapper onSkip={onSkip}>
      <p>아! 모든 연구는 {nickname} 님에게</p>
      <p>
        <strong>익명</strong>으로 비밀리에 전달되니
      </p>
      <p>걱정하지 마세요.</p>
    </SkipStaggerWrapper>
  );
};
