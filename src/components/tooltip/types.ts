import { type HTMLAttributes, type ReactElement, type RefCallback, type RefObject } from 'react';
import { type Interpolation, type Theme } from '@emotion/react';

export interface AnchorProps {
  /**
   * @description
   * 꼬리의 위치를 설정합니다. contentPositionByRatio만큼 content가 움직입니다. undefined일 경우 children의 가운데에 꼬리가 위치합니다.
   */
  contentPositionByRatio?: number;
}

type ReactElementWithRef = ReactElement & {
  ref?: RefObject<any> | RefCallback<any>;
};

export interface TooltipProps extends Pick<AnchorProps, 'contentPositionByRatio'> {
  /**
   * @description
   * 툴팁이 켜지고 꺼지는 상태
   */
  isShowing?: boolean;
  className?: string;
  children: ReactElementWithRef;
  /**
   * @description
   * 문구를 string 혹은 jsx로 넣어주세요
   */
  message: string | ReactElement;
  /**
   * @description
   * 툴팁이 children의 위, 아래 중 어디로 위치할지 결정합니다. 기본값은 top입니다.
   * @default "top"
   */
  placement?: 'top' | 'bottom';
  /**
   * @description
   * 툴팁이 children에서 얼마나 떨어져있을지 결정합니다. 기본값은 7px입니다.
   * @default 7
   */
  offset?: number;
  /**
   * @description
   * 툴팁 내부를 클릭했을때, 꺼지지 않고 툴팁 내부의 요소와 상호작용 할 수 있게 해줍니다.
   */
  interactive?: boolean;
  /**
   * @description
   * 툴팁이 꺼질 때 호출될 함수
   */
  onClose?: () => void;
  /**
   * @description
   * 툴팁 바깥 영역을 클릭했을 때 호출될 함수
   */
  onClickOutside?: () => void;
  /**
   * @description
   * children을 클릭했을 때 호출될 함수
   */
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
