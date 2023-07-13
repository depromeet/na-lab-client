import { forwardRef, type Ref, useRef } from 'react';
import { css, type Theme } from '@emotion/react';
import { m, type Variants } from 'framer-motion';

import { BODY_2_REGULAR } from '~/styles/typo';

import TOOLTIP_STYLE from '../../constants/tooltipStyle';
import { useTooltip } from '../../contexts/TooltipContext';
import { type TooltipBaseProps } from '../../types';
import { mergeRefs } from '../../utils/mergeRefs';
import { Anchor } from './Anchor';

export const TooltipBase = forwardRef(function Tooltip(
  { placement, className, anchorMarginLeft = 0, message, overrideCss }: TooltipBaseProps,
  ref: Ref<HTMLDivElement>,
) {
  const { tooltipBaseRef } = useTooltip();
  const contentRef = useRef<HTMLDivElement>(null);
  const { anchorWidth, anchorHeight, borderRadius, paddingX, paddingY } = TOOLTIP_STYLE;

  return (
    <div className={className} ref={mergeRefs(tooltipBaseRef, ref)} css={[htmlCss, overrideCss]}>
      <m.div
        css={transformOriginCss(placement, anchorWidth, anchorMarginLeft)}
        variants={tooltipVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div ref={contentRef} css={(theme) => backgroundCss(theme, anchorHeight, paddingX, paddingY, borderRadius)}>
          <div
            css={anchorCss(
              placement,
              contentRef.current?.clientHeight ?? 0,
              anchorWidth,
              anchorHeight,
              anchorMarginLeft,
            )}
          >
            <Anchor />
          </div>
          <div css={(theme) => messageContainerCss(theme, anchorWidth, paddingX)}>
            <p css={(theme) => messageCss(theme)}>{message}</p>
          </div>
        </div>
      </m.div>
    </div>
  );
});

const htmlCss = css`
  display: flex;
`;

const anchorCss = (
  placement: 'top' | 'bottom',
  clientHeight: number,
  anchorWidth: number,
  anchorHeight: number,
  anchorMarginLeft: number,
) => css`
  position: absolute;
  top: ${placement === 'top' ? clientHeight - 2.5 : -anchorHeight}px;
  left: ${anchorMarginLeft}px;
  transform: ${placement === 'top' ? 'scaleY(-1)' : 'none'};

  display: flex;

  width: ${anchorWidth}px;
  height: ${anchorHeight + 2}px;
`;

const backgroundCss = (
  theme: Theme,
  anchorHeight: number,
  paddingX: number,
  paddingY: number,
  borderRadius: number,
) => css`
  position: relative;

  width: fit-content;
  height: calc(100% - ${anchorHeight});
  padding: ${paddingY / 2}px ${paddingX / 2}px;

  background-color: ${theme.colors.secondary_200};
  border-radius: ${borderRadius}px;
`;

const messageContainerCss = (theme: Theme, anchorWidth: number, paddingX: number) => css`
  display: flex;
  align-items: center;

  width: 100%;
  min-width: ${anchorWidth + paddingX / 2};

  color: ${theme.colors.white};
  text-align: center;
`;

const messageCss = (theme: Theme) => css`
  ${BODY_2_REGULAR}

  color: ${theme.colors.white}
`;

const transformOriginCss = (placement: 'top' | 'bottom', anchorWidth: number, anchorMarginLeft: number) => css`
  transform-origin: ${anchorMarginLeft + anchorWidth / 2}px ${placement === 'bottom' ? 'top' : 'bottom'};
`;

const tooltipVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: [0, 1.2, 1],
    transition: { delay: 0.5, duration: 0.4, type: 'spring' },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};
