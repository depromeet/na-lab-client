/* eslint-disable unicorn/filename-case */
import { type PropsWithChildren } from 'react';
import { css, keyframes, type Theme } from '@emotion/react';
import { m, type Variants } from 'framer-motion';

import { defaultEasing } from '~/constants/motions';
import { BODY_2_REGULAR } from '~/styles/typo';

interface Props {
  tooltipLabel: string;
}

const TooltipButton = ({ tooltipLabel, children }: PropsWithChildren<Props>) => {
  return (
    <m.div css={ctaWrapperCss} variants={ctaVariants}>
      <m.span css={bubbleSpanCss} variants={bubbleVariants}>
        {tooltipLabel}
      </m.span>
      {children}
    </m.div>
  );
};

export default TooltipButton;

const fixedBottomCss = (theme: Theme) => css`
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  padding: 0 16px;
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
