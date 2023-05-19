import { type ComponentProps } from 'react';
import { AnimatePresence } from 'framer-motion';

import Portal from './Portal';

interface Props extends ComponentProps<typeof Portal> {
  /**
   * children의 렌더링 여부
   */
  isShowing: boolean;
  /**
   * framer-motion AnimatePresence의 mode
   * @default 'wait'
   */
  mode?: ComponentProps<typeof AnimatePresence>['mode'];
}

/**
 * @description Portal을 AnimatePresence와 함께 사용합니다
 */
const AnimatePortal = ({ children, isShowing, mode = 'wait' }: Props) => {
  return (
    <Portal>
      <AnimatePresence mode={mode}>{isShowing && children}</AnimatePresence>
    </Portal>
  );
};

export default AnimatePortal;
