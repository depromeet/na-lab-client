import { createContext, type ReactNode, type RefObject, useContext, useRef } from 'react';

import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useOnClickTooltip } from '../hooks/useOnClickTooltip';

interface TooltipProviderProps {
  children: ReactNode;
  placement?: 'top' | 'bottom';
  offsetNumber?: number;
  interactive?: boolean;
  onClickTooltip?: () => void;
  onClickOutside?: () => void;
}

interface State {
  tooltipBaseRef: RefObject<HTMLDivElement> | null;
  targetRef: RefObject<HTMLDivElement> | null;
  floatingRef: RefObject<HTMLDivElement> | null;
  offset: number;
}

export const TooltipContext = createContext<State | null>(null);

export function TooltipProvider({
  children,
  offsetNumber = 0,
  onClickOutside,
  onClickTooltip,
  interactive,
}: TooltipProviderProps) {
  const tooltipBaseRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useOnClickOutside({ ref: tooltipBaseRef, onClickOutside, interactive });
  useOnClickTooltip({ ref: tooltipBaseRef, onClickTooltip, interactive });

  return (
    <TooltipContext.Provider
      value={{
        targetRef,
        tooltipBaseRef,
        floatingRef,
        offset: offsetNumber,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

export function useTooltip() {
  const tooltip = useContext(TooltipContext);

  return tooltip ?? DEFAULT_VALUE;
}

const DEFAULT_VALUE = {
  tooltipBaseRef: null,
  targetRef: null,
  floatingRef: null,
  offset: null,
};
