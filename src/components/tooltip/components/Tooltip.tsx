import { useState } from 'react';

import { TooltipProvider } from '../contexts/TooltipContext';
import { type TooltipProps } from '../types';
import { FloatingTooltip } from './Tooltip/FloatingTooltip';

export function ControlledTooltip(props: TooltipProps) {
  const { placement, offset, onClickOutside, interactive } = props;

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

  return (
    <ControlledTooltip
      {...props}
      isShowing={isShowing}
      onClose={() => setIsShowing(false)}
      onChildrenClick={() => setIsShowing(!isShowing)}
    />
  );
}

export function Tooltip(props: TooltipProps) {
  if (props.isShowing !== undefined) {
    return <ControlledTooltip {...props} />;
  } else {
    return <UncontrolledTooltip {...props} />;
  }
}
