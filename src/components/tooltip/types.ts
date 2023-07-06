import { type HTMLAttributes, type ReactElement, type RefCallback, type RefObject } from 'react';
import { type Interpolation, type Theme } from '@emotion/react';

export interface AnchorProps {
  /**
   * @description
   * normal Tooltip의 경우, 꼬리는 children의 가운데로 고정됩니다. contentPositionByRatio만큼 content가 움직입니다.
   */
  contentPositionByRatio?: number;
}

type ReactElementWithRef = ReactElement & {
  ref?: RefObject<any> | RefCallback<any>;
};

export interface TooltipProps extends Pick<AnchorProps, 'contentPositionByRatio'> {
  isShowing?: boolean;
  className?: string;
  children: ReactElementWithRef;
  message: string | ReactElement;
  placement?: 'top' | 'bottom';
  offset?: number;
  interactive?: boolean;
  onClose?: () => void;
  onClickOutside?: () => void;
  onChildrenClick?: () => void;
}

export interface TooltipBaseProps extends HTMLAttributes<HTMLDivElement> {
  message?: string | ReactElement;
  className?: string;
  background?: ReactElement;
  placement: 'top' | 'bottom';
  anchorMarginLeft?: number;
  overrideCss?: Interpolation<Theme>;
}
