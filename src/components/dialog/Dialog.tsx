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

interface Props {
  title?: string | ReactElement;
  description?: string | ReactElement;
  cancelButton?: ReactElement;
  confirmButton?: ReactElement;
  onClickOutside?: VoidFunction;
}

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

export default Dialog;

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
        {title && (typeof title === 'string' ? <span css={titleCss}>{title}</span> : title)}
        {description &&
          (typeof description === 'string' ? <span css={descriptionCss}>{description}</span> : description)}
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
  gap: 40px;

  padding: 36px 16px 16px;

  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0 22px -18px #125b7a;
`;

const textWrapperCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

//TODO: 폰트 토큰 없음. 디자인 문의
const titleCss = css`
  /* font-family: Pretendard; */
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: 20px;
  color: #17171b;
  text-align: center;
  white-space: pre-wrap;
`;

//TODO: 폰트 토큰 없음. 디자인 문의
const descriptionCss = css`
  /* font-family: Pretendard; */
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  line-height: 16px;
  color: #6b7180;
  text-align: center;
  white-space: pre-wrap;
`;

const buttonWrapperCss = css`
  display: flex;
  gap: 9px;
`;
