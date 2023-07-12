import { useCallback } from 'react';

import useIsMounted from '~/hooks/lifeCycle/useIsMounted';

import TOOLTIP_STYLE from '../constants/tooltipStyle';

interface UseTailPositionProps {
  anchorPositionByRatio?: number;
  defaultPosition?: number;
  anchorWidth: number;
  tooltipWidth: number;
}

export function useAnchorPosition({
  defaultPosition,
  anchorPositionByRatio,
  anchorWidth,
  tooltipWidth,
}: UseTailPositionProps) {
  const isMounted = useIsMounted();

  const getElementDistanceFromLeftByRatio = useCallback(
    (ratio = 0) => {
      return ratio * (tooltipWidth - TOOLTIP_STYLE.paddingX - anchorWidth) + TOOLTIP_STYLE.paddingX / 2;
    },
    [anchorWidth, tooltipWidth],
  );

  if (!isMounted) {
    return defaultPosition;
  }

  if (anchorPositionByRatio != null) {
    return getElementDistanceFromLeftByRatio(anchorPositionByRatio);
  }

  return defaultPosition ?? getElementDistanceFromLeftByRatio(0.5);
}
