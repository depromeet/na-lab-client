import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import { defaultFadeInVariants } from '~/constants/motions';
import useDidMount from '~/hooks/lifeCycle/useDidMount';
import recordEvent from '~/utils/event';

import { type StepProps } from './type';

interface Props extends StepProps {
  nickname: Reviewer['nickname'];
}

const QuestionIntro = ({ nickname, next }: Props) => {
  useDidMount(() => {
    const timeout = setTimeout(() => {
      next?.();
    }, 3000);

    return () => clearTimeout(timeout);
  });

  useDidMount(() => {
    recordEvent({ action: '리뷰어 - 질문 인트로' });
  });

  return (
    <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
      <StaggerWrapper wrapperOverrideCss={wrapperCss}>
        <p>좋아요!</p>
        <p>
          이제부턴 <strong>{nickname}</strong>님에 대해
        </p>
        <p>본격적으로 여쭤볼게요.</p>
      </StaggerWrapper>

      <picture css={pictureCss}>
        <source srcSet="/images/review/question-intro.webp" type="image/webp" />
        <Image src="/images/review/question-intro.png" alt="question intro" fill />
      </picture>
    </m.section>
  );
};

export default QuestionIntro;

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

const wrapperCss = css`
  margin-top: 126px;
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
