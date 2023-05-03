import { type ComponentProps } from 'react';
import { AnimatePresence } from 'framer-motion';

import Portal from './Portal';

interface Props extends ComponentProps<typeof Portal> {
  isShowing: boolean;
  mode?: ComponentProps<typeof AnimatePresence>['mode'];
}

const AnimatePortal = ({ children, isShowing, mode = 'wait' }: Props) => {
  return (
    <Portal>
      <AnimatePresence mode={mode}>{isShowing && children}</AnimatePresence>
    </Portal>
  );
};

export default AnimatePortal;
