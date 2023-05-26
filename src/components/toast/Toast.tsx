import { type ComponentProps, forwardRef, type Ref } from 'react';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import { defaultFadeInUpVariants } from '~/constants/motions';
import { BODY_1 } from '~/styles/typo';

import AnimatePortal from '../portal/AnimatePortal';

interface ToastProps {
  isShowing: boolean;
  higherThanCTA?: boolean;
  text: string;
  icon?: React.ReactNode;
  onToastClick?: () => void;
}

const CTA_HEIGHT = 92;
const CTA_PADDING = 8;
const BOTTOM_SAFETY_HEIGHT = 24;

const Toast = forwardRef(function Toast(
  {
    isShowing,
    higherThanCTA = true,
    text,
    icon,
    mode,
    onToastClick,
  }: ToastProps & ComponentProps<typeof AnimatePortal>,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <m.div
        ref={ref}
        css={toastContainerCss(higherThanCTA)}
        variants={defaultFadeInUpVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onToastClick}
      >
        <ToastContent {...{ isShowing, icon, text }} />
      </m.div>
    </AnimatePortal>
  );
});

const toastContainerCss = (higherThanCTA: boolean) => css`
  position: fixed;
  bottom: ${higherThanCTA ? CTA_HEIGHT + CTA_PADDING : BOTTOM_SAFETY_HEIGHT}px;
  left: 0;

  display: flex;
  justify-content: center;

  width: 100%;
  height: fit-content;
`;

const ToastContent = ({ icon, text }: Pick<ToastProps, 'icon' | 'text'>) => {
  return (
    <div css={toastCss}>
      {icon && <div>{icon}</div>}
      <span css={toastTextCss}>{text}</span>
    </div>
  );
};

export default Toast;

const toastCss = css`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  height: 56px;
  padding: 16px 20px;

  background-color: #394258cc;
  backdrop-filter: blur(4px);
  border-radius: 44px;
`;

const toastTextCss = ({ colors }: Theme) => css`
  ${BODY_1};

  color: ${colors.white};
`;
