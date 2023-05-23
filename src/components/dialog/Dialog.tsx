import {
  type ComponentProps,
  type CSSProperties,
  type MouseEvent,
  type ReactElement,
  useEffect,
  useState,
} from 'react';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

import AnimatePortal from '../portal/AnimatePortal';
import { CancelButton, ConfirmButton } from './DialogButton';
import { Description, Title } from './DialogText';

interface Props {
  /**
   * 제목을 `string` 혹은 `ReactElement`로 전달해주세요.
   */
  title?: string | ReactElement;
  /**
   * 설명을 `string` 혹은 `ReactElement`로 전달해주세요.
   */
  description?: string | ReactElement;
  /**
   * 좌측 취소 버튼을 `ReactElement`로 전달해주세요.
   */
  cancelButton?: ReactElement;
  /**
   * 우측 확인 버튼을 `ReactElement`로 전달해주세요.
   */
  confirmButton?: ReactElement;
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
 * @param title 제목을 `string` 혹은 `ReactElement`로 전달해주세요.
 * @param description 설명을 `string` 혹은 `ReactElement`로 전달해주세요.
 * @param cancelButton 좌측 취소 버튼을 `ReactElement`로 전달해주세요.
 * @param confirmButton 우측 확인 버튼을 `ReactElement`로 전달해주세요.
 */
const Dialog = ({ isShowing, mode, onClickOutside, ...props }: Props & ComponentProps<typeof AnimatePortal>) => {
  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <div>
        <DialogBlur onClickOutside={onClickOutside} />
        <DialogContent {...props} />
      </div>
    </AnimatePortal>
  );
};

const DialogBlur = ({ onClickOutside }: Pick<Props, 'onClickOutside'>) => {
  const onClickOutsideDefault = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOutside) onClickOutside();
  };

  return <m.div onClick={onClickOutsideDefault} css={blurCss} animate={{ opacity: [0, 1] }} exit={{ opacity: 0 }} />;
};

const blurCss = css`
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100%;

  background-color: #d8e3ff99;
  backdrop-filter: blur(12.5px);
`;

const DialogContent = ({ title, description, cancelButton, confirmButton }: Omit<Props, 'onClickOutside'>) => {
  const [width, setWidth] = useState(480);

  useEffect(() => {
    setWidth(Math.min(window.innerWidth, 480) - 48);

    const containerStyle = document.body.style;
    containerStyle.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    return () => {
      const scrollY = containerStyle.top;
      containerStyle.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <m.div style={{ width } as CSSProperties} css={containerCss} animate={{ opacity: [0, 1] }} exit={{ opacity: 0 }}>
      <div css={textWrapperCss}>
        {title && (typeof title === 'string' ? <Title>{title}</Title> : title)}
        {description && (typeof description === 'string' ? <Description>{description}</Description> : description)}
      </div>
      <div css={buttonWrapperCss}>
        {cancelButton}
        {confirmButton}
      </div>
    </m.div>
  );
};

const containerCss = css`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px;

  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0 40px #638fff4d;
`;

const textWrapperCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;

  padding: 24px 16px;
`;

const buttonWrapperCss = css`
  display: flex;
  gap: 9px;
`;

Dialog.Title = Title;
Dialog.Description = Description;
Dialog.CancelButton = CancelButton;
Dialog.ConfirmButton = ConfirmButton;

export default Dialog;
