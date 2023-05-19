import { type ComponentProps, type MouseEventHandler } from 'react';
import { css } from '@emotion/react';
import { m, type Variants } from 'framer-motion';

import { defaultEasing, defaultFadeInVariants } from '~/constants/motions';

import AnimatePortal from '../portal/AnimatePortal';
import { scrimCss } from '../scrim/default.style';

interface Props extends ComponentProps<typeof AnimatePortal> {
  /**
   * scrim을 클릭했을 때 실행되는 함수이며, 기본적으로 target을 확인한 후 실행됩니다
   */
  onClickOutside?: VoidFunction;
}

const BottomSheet = ({ onClickOutside, isShowing, children, mode }: Props) => {
  const onClickOutsideDefault: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOutside) onClickOutside();
  };

  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <m.div
        onClick={onClickOutsideDefault}
        css={scrimCss}
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <m.div css={contentCss} variants={bottomSheetVariants}>
          {children}
        </m.div>
      </m.div>
    </AnimatePortal>
  );
};

export default BottomSheet;

const contentCss = css`
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 0;

  width: 100%;

  /* TODO: 디자인에 따라 변경 필요 */
  min-height: 400px;
  max-height: 95%;
  padding-top: 16px;
  padding-right: 20px;
  padding-left: 20px;

  /* TODO: 디자인에 따라 변경 필요 */
  background-color: white;
`;

const bottomSheetVariants: Variants = {
  initial: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  animate: {
    y: '-100%',
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  exit: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
};
