import { css, type Theme } from '@emotion/react';

import { defaultEasing } from '~/constants/motions';

// NOTE : 공통적으로 여러번 사용됨
export const fixedBottomCss = (theme: Theme) => css`
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  padding: 0 16px;
`;

export const paragraphContainerCss = css`
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
`;

export const centerContainerCss = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const fixedContainerCss = (top?: number) => css`
  position: fixed;
  top: ${top ?? 50}%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const imageVariant = {
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
