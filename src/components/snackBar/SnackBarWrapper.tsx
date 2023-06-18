import { css, type Theme } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';
import { useAtomValue } from 'jotai';

import { defaultFadeInUpVariants } from '~/constants/motions';
import { snackBarsAtom } from '~/store/snackBar';

import SnackBar from './SnackBar';

const SnackBarWrapper = () => {
  const snackBars = useAtomValue(snackBarsAtom);

  return (
    <m.section css={wrapperCss}>
      <AnimatePresence mode="sync">
        {snackBars.map((snackBar) => (
          <m.div
            key={snackBar.id}
            layoutId={snackBar.id}
            variants={defaultFadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={snackBar.onClick}
          >
            <SnackBar.Content
              content={
                <>
                  {snackBar.content}
                  <SnackBar.DeleteButton id={snackBar.id} deleteElement={snackBar.deleteElement} />
                </>
              }
            />
          </m.div>
        ))}
      </AnimatePresence>
    </m.section>
  );
};

export default SnackBarWrapper;

const wrapperCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.belowFixed};
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  width: 100dvw;
  max-width: ${theme.size.maxWidth};
  height: fit-content;
  padding: 0 23px;
`;
