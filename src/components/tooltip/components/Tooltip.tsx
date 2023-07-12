import { useEffect, useState } from 'react';

import { TooltipProvider } from '../contexts/TooltipContext';
import { type TooltipProps } from '../types';
import { FloatingTooltip } from './Tooltip/FloatingTooltip';

export function ControlledTooltip(props: TooltipProps) {
  const { placement, offset, onClickOutside, interactive, isShowing, onClose } = props;

  useEffect(() => {
    if (!isShowing && onClose) {
      onClose();
    }
  }, [isShowing, onClose]);

  return (
    <TooltipProvider
      placement={placement}
      offsetNumber={offset}
      onClickOutside={onClickOutside}
      interactive={interactive}
    >
      <FloatingTooltip {...props} />
    </TooltipProvider>
  );
}

export function UncontrolledTooltip({ ...props }: TooltipProps) {
  const [isShowing, setIsShowing] = useState(true);

  return <ControlledTooltip {...props} isShowing={isShowing} onChildrenClick={() => setIsShowing(!isShowing)} />;
}

/**
 * @description 툴팁을 부착하려는 요소를 <Tooltip>으로 감싸주세요.
 * isShowing을 넘겨주지 않으면 Uncontrolled 방식의 툴팁을 사용할 수 있습니다.
 */
export function Tooltip(props: TooltipProps) {
  if (props.isShowing !== undefined) {
    return <ControlledTooltip {...props} />;
  } else {
    return <UncontrolledTooltip {...props} />;
  }
}
