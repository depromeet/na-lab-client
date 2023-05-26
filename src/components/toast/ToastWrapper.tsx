import { css } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';
import { useAtomValue } from 'jotai';

import { defaultFadeInUpVariants } from '~/constants/motions';
import { toastAtom } from '~/store/toast';

import Toast from './Toast';

const CTA_HEIGHT = 92;
const CTA_PADDING = 8;
const BOTTOM_SAFETY_HEIGHT = 24;

const ToastWrapper = () => {
  const toast = useAtomValue(toastAtom);

  return (
    <div>
      <AnimatePresence mode="wait">
        {toast && (
          <m.div
            key={String(toast.content)}
            css={toastContainerCss(toast.higherThanCTA ?? false)}
            variants={defaultFadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Toast.Content content={toast.content} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToastWrapper;

const toastContainerCss = (higherThanCTA: boolean) => css`
  position: fixed;
  z-index: 2000;
  bottom: ${higherThanCTA ? CTA_HEIGHT + CTA_PADDING : BOTTOM_SAFETY_HEIGHT}px;
  left: 0;

  display: flex;
  justify-content: center;

  width: 100%;
  height: fit-content;
`;
