import { cloneElement, useEffect, useLayoutEffect, useState } from 'react';
import { css, type Theme } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

import useIsMounted from '~/hooks/lifeCycle/useIsMounted';

import TOOLTIP_STYLE from '../../constants/tooltipStyle';
import { useTooltip } from '../../contexts/TooltipContext';
import { useAnchorPosition } from '../../hooks/useAnchorPosition';
import { type TooltipProps } from '../../types';
import { mergeRefs } from '../../utils/mergeRefs';
import { TooltipBase } from './TooltipBase';

export function FloatingTooltip({ isShowing, children, onChildrenClick, ...props }: Omit<TooltipProps, 'interactive'>) {
  const { targetRef } = useTooltip();
  const childRef = children.ref;
  const isMounted = useIsMounted();

  useEffect(() => {
    if (targetRef) {
      const currentTargetRef = targetRef.current;

      if (currentTargetRef && onChildrenClick) {
        currentTargetRef.addEventListener('click', onChildrenClick);

        return () => {
          currentTargetRef.removeEventListener('click', onChildrenClick);
        };
      }
    }
  }, [targetRef, onChildrenClick]);

  const child = cloneElement(children, {
    ref: childRef ? mergeRefs(targetRef, childRef) : targetRef,
  });

  return (
    <div style={{ width: '100%' }}>
      {child}
      {isMounted
        ? createPortal(
            <AnimatePresence>{isShowing && <FloatingTooltipContent key="tooltip" {...props} />}</AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

const FloatingTooltipContent = ({
  message,
  className,
  placement = 'top',
  contentPositionByRatio,
}: Omit<TooltipProps, 'isShowing' | 'children' | 'interactive'>) => {
  const { tooltipBaseRef, targetRef, floatingRef, offset } = useTooltip();

  const [tooltipWidth, setTooltipWidth] = useState(0);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [initialBoundingClientRect, setInitialBoundingClientRect] = useState<DOMRect | null>(null);

  const isMounted = useIsMounted();

  useLayoutEffect(() => {
    if (targetRef && targetRef.current) {
      setInitialBoundingClientRect(targetRef.current?.getBoundingClientRect());
    }
  }, [targetRef, targetRef?.current]);

  useEffect(() => {
    if (tooltipBaseRef?.current) {
      setTooltipWidth(tooltipBaseRef.current.clientWidth);
    }
  }, [isMounted, tooltipBaseRef, tooltipBaseRef?.current?.clientWidth]);

  useEffect(() => {
    if (tooltipBaseRef?.current) {
      setTooltipHeight(tooltipBaseRef.current.clientHeight);
    }
  }, [isMounted, initialBoundingClientRect, tooltipBaseRef, tooltipBaseRef?.current?.clientHeight]);

  const { anchorWidth, anchorHeight } = TOOLTIP_STYLE;

  const anchorMarginLeft = useAnchorPosition({
    anchorPositionByRatio: contentPositionByRatio,
    anchorWidth,
    tooltipWidth,
  });

  return (
    <>
      {anchorMarginLeft &&
        targetRef &&
        targetRef.current &&
        targetRef.current?.getBoundingClientRect() &&
        initialBoundingClientRect && (
          <div css={wrapperCss(document.documentElement.scrollHeight)}>
            <TooltipBase
              ref={floatingRef}
              className={className}
              message={message}
              placement={placement}
              anchorMarginLeft={anchorMarginLeft}
              overrideCss={(theme) =>
                tooltipBaseCss({
                  theme,
                  placement,
                  initialLeft: initialBoundingClientRect.left ?? 0,
                  initialWidth: initialBoundingClientRect.width ?? 0,
                  offsetTop: initialBoundingClientRect.top ?? 0,
                  clientHeight: targetRef.current?.clientHeight ?? 0,
                  anchorWidth,
                  anchorHeight,
                  anchorMarginLeft,
                  tooltipHeight,
                  offset,
                })
              }
            />
          </div>
        )}
    </>
  );
};

const wrapperCss = (scrollHeight: number) => css`
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;

  overflow-x: hidden;
  overflow-y: visible;

  width: 100dvw;
  height: ${scrollHeight}px;
`;

interface TooltipBaseCssProps {
  theme: Theme;
  placement: 'top' | 'bottom';
  initialLeft: number;
  initialWidth: number;
  offsetTop: number;
  clientHeight: number;
  anchorWidth: number;
  anchorHeight: number;
  anchorMarginLeft: number;
  tooltipHeight: number;
  offset: number;
}

const tooltipBaseCss = ({
  theme,
  placement,
  initialLeft,
  initialWidth,
  offsetTop,
  clientHeight,
  anchorWidth,
  anchorHeight,
  anchorMarginLeft,
  tooltipHeight,
  offset,
}: TooltipBaseCssProps) => css`
  pointer-events: 'auto';

  position: absolute;
  z-index: ${theme.zIndex.below(theme.zIndex.toast)};
  top: ${offsetTop +
  (placement === 'top' ? -tooltipHeight - anchorHeight - offset : clientHeight + anchorHeight + offset)}px;
  left: ${(initialLeft ?? 0) + (initialWidth ?? 0) / 2 - anchorWidth / 2 - anchorMarginLeft}px;
`;
