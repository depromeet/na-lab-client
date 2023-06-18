import { type MouseEventHandler, useState } from 'react';
import Image from 'next/image';
import { css, keyframes, type Theme } from '@emotion/react';
import { type UseMutationResult } from '@tanstack/react-query';
import { m, type Variants } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import XIcon from '~/components/icons/XIcon';
import InternalLink from '~/components/link/InternalLink';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import { defaultEasing, defaultFadeInVariants } from '~/constants/motions';
import useDidMount from '~/hooks/lifeCycle/useDidMount';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import { BODY_2_REGULAR } from '~/styles/typo';
import recordEvent from '~/utils/event';

import { fixedBottomCss } from '../style';

interface Props {
  postMutation: UseMutationResult<void, unknown, void, unknown>;
}

const Last = ({ postMutation }: Props) => {
  const router = useInternalRouter();
  const [isInnerLoading, setIsInnerLoading] = useState(true);

  useDidMount(() => {
    postMutation.mutate(undefined, { onSuccess: () => setIsInnerLoading(false) });
  });

  const onClickCTA: MouseEventHandler<HTMLButtonElement> = () => {
    recordEvent({ action: '리뷰어 - 마지막 - 나도 질문 폼 생성하기 버튼 클릭' });
    router.push('/survey');
  };

  return (
    <LoadingHandler isLoading={isInnerLoading} fallback={<FixedSpinner />}>
      <m.section
        key="loading-end"
        css={sectionCss}
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <header css={headerCss}>
          <InternalLink href="/">
            <XIcon />
          </InternalLink>
        </header>

        <StaggerWrapper>
          <p>응답해주셔서 감사해요.</p>
          <p>좋은 연구 자료가 되었어요!</p>
        </StaggerWrapper>

        <picture css={pictureCss}>
          <source srcSet="/images/review/last.webp" type="image/webp" />
          <Image src="/images/review/last.png" alt="응답해주셔서 감사해요" fill />
        </picture>

        {/* TODO : TooltipButton 적용하기 */}
        <m.div css={ctaWrapperCss} variants={ctaVariants}>
          <m.span css={bubbleSpanCss} variants={bubbleVariants}>
            단 3분이면 나의 질문 폼 링크를 만들 수 있어요!
          </m.span>
          <CTAButton onClick={onClickCTA} color="blue">
            나도 커리어 질문 폼 생성하기
          </CTAButton>
        </m.div>
      </m.section>
    </LoadingHandler>
  );
};

export default Last;

const sectionCss = (theme: Theme) => css`
  z-index: ${theme.zIndex.aboveFixed};

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${theme.colors.white};
`;

const headerCss = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: 62px;
  margin-bottom: 62px;
`;

const pictureCss = css`
  position: relative;

  display: block;

  width: 80%;
  height: 250px;
  margin-top: 34px;

  & img {
    object-fit: contain;
  }
`;

const ctaWrapperCss = (theme: Theme) => css`
  ${fixedBottomCss(theme)}
`;

const ctaVariants: Variants = {
  initial: {
    opacity: 0,
    x: '-50%',
    y: 30,
    transition: { duration: 0.3, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    x: '-50%',
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    x: '-50%',
    y: 30,
    transition: { duration: 0.3, ease: defaultEasing },
  },
};

const floatingKeyframes = keyframes`
  from {
    transform: translateY(0) translateX(-50%);
  }
  65% {
    transform: translateY(-3px) translateX(-50%);;
  }
  to {
    transform: translateY(0) translateX(-50%);;
  }
`;

const bubbleSpanCss = (theme: Theme) => css`
  ${BODY_2_REGULAR};

  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);

  width: max-content;
  padding: 10px 14px;

  color: ${theme.colors.white};

  background-color: ${theme.colors.secondary_200};
  border-radius: 6px;

  animation: ${floatingKeyframes} 4s ${theme.transition.defaultEasing} infinite;

  &::after {
    content: '';

    position: absolute;
    z-index: ${theme.zIndex.belowDefault};
    bottom: -20%;
    left: 50%;
    transform: translateX(-50%);

    width: 0;
    height: 0;

    border-top: 24px solid ${theme.colors.secondary_200};
    border-right: 12px solid transparent;
    border-left: 12px solid transparent;
    border-radius: 1px;
  }
`;

const bubbleVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    x: '-50%',
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    x: '-50%',
    transition: { duration: 0.5, ease: defaultEasing, delay: 1 },
  },
  exit: {
    opacity: 0,
    y: 10,
    x: '-50%',
    transition: { duration: 0.5, ease: defaultEasing },
  },
};
