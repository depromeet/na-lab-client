import { type ComponentProps, type MouseEvent, type PropsWithChildren } from 'react';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import Header from '~/components/header/Header';
import { defaultFadeInVariants } from '~/constants/motions';
import useScrollLock from '~/hooks/common/useScrollLock';

import AnimatePortal from '../portal/AnimatePortal';

interface Props {
  /**
   * 외부영역 클릭시 호출될 함수
   */
  onClickOutside?: VoidFunction;
}

/**
 *
 * @param isShowing 열림/닫힘 상태
 * @param mode AnimatePresence mode
 * @param onClickOutside 외부영역 클릭시 호출될 함수
 */
const Modal = ({
  isShowing,
  mode,
  onClickOutside,
  children,
}: PropsWithChildren<Props> & ComponentProps<typeof AnimatePortal>) => {
  useScrollLock({ lock: isShowing });

  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <div css={dialogPositionCss}>
        <ModalBlur onClickOutside={onClickOutside} />
        <div css={containerCss}>{children}</div>
      </div>
    </AnimatePortal>
  );
};

const dialogPositionCss = css`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
`;

const ModalBlur = ({ onClickOutside }: Pick<Props, 'onClickOutside'>) => {
  const onClickOutsideDefault = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOutside) onClickOutside();
  };

  return (
    <m.div
      onClick={onClickOutsideDefault}
      css={blurCss}
      variants={defaultFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    />
  );
};

const blurCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.backdrop};
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: #d8e3ff99;
  backdrop-filter: blur(12.5px);
`;

const containerCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.modal};

  display: flex;
  flex-direction: column;

  max-width: ${theme.size.maxWidth};

  border-radius: 16px;
`;

const ModalHeader = ({ ...props }: ComponentProps<typeof Header>) => {
  return <Header {...props} />;
};

Modal.Header = ModalHeader;

export default Modal;
