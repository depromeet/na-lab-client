import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type FormEventHandler,
  type MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { css, type Theme } from '@emotion/react';
import { m, type TargetAndTransition } from 'framer-motion';

import { ArrowCircleButton } from '~/components/button/CircleButton';
import SendIcon from '~/components/icons/SendIcon';
import useToast from '~/components/toast/useToast';
import { defaultEasing, defaultFadeInVariants } from '~/constants/motions';
import useInput from '~/hooks/common/useInput';
import { BODY_1 } from '~/styles/typo';

import { fixedBottomCss } from '../style';

interface Props {
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  isBackDisabled?: boolean;
  onTextSubmit: (text: string) => void;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
}

// NOTE: padding - 32px, button - 56px, margin - 10px
const INPUT_DEFAULT_WIDTH = 'calc(100% - 32px - 56px - 10px)';
const INPUT_OPEN_WIDTH = 'calc(100% - 32px)';
const INPUT_MAX_LENGTH = 2000;

const ChatInputBottom = ({ onBackClick, isBackDisabled, onTextSubmit, onFocus }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, onChangeText, resetText] = useInput();
  const [isInputWide, setIsInputWide] = useState(false);

  const { fireToast } = useToast();

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = '5px';
    textarea.style.height = textarea.scrollHeight + 'px';

    if (e.target.value.length >= INPUT_MAX_LENGTH) {
      fireToast({ content: `최대 ${INPUT_MAX_LENGTH}자까지 입력할 수 있어요.`, higherThanCTA: true });
    }

    onChangeText(e);
    if (e.target.value) setIsInputWide(true);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onTextSubmit(text);
    resetText();
    setIsInputWide(false);

    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = '5px';
  };

  const onInnerFocus: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    setIsInputWide(true);
    onFocus?.(e);
  };

  const onBlur = () => {
    if (text.length) return;
    setIsInputWide(false);
  };

  return (
    <m.form
      css={wrapperCss}
      onSubmit={onSubmit}
      variants={defaultFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <m.div animate={backButtonTransition(isInputWide)}>
        <ArrowCircleButton onClick={onBackClick} disabled={isBackDisabled} type="button" />
      </m.div>
      <m.textarea
        ref={textareaRef}
        required
        maxLength={INPUT_MAX_LENGTH}
        placeholder="메세지 보내기..."
        value={text}
        onChange={onChange}
        onFocus={onInnerFocus}
        onBlur={onBlur}
        style={{ width: isInputWide ? INPUT_OPEN_WIDTH : INPUT_DEFAULT_WIDTH }}
        css={textareaCss}
      />
      <button type="submit" disabled={!Boolean(text)} css={buttonCss}>
        <SendIcon />
      </button>
    </m.form>
  );
};

export default ChatInputBottom;

const wrapperCss = (theme: Theme) => css`
  ${fixedBottomCss(theme)};
  display: flex;
  align-items: center;
`;

const backButtonTransition = (isInputWide: boolean): TargetAndTransition => ({
  scale: isInputWide ? 0.8 : 1,
  transition: {
    duration: 0.2,
    ease: defaultEasing,
  },
});

const textareaCss = (theme: Theme) => css`
  ${BODY_1};
  resize: none;

  position: absolute;
  right: 16px;
  bottom: 4px;

  width: ${INPUT_DEFAULT_WIDTH};
  height: 48px;
  min-height: 48px;
  max-height: 120px;
  padding: 12px 36px 12px 14px;

  background-color: rgb(244 245 249 / 50%);
  backdrop-filter: blur(12.5px);
  border: 1px solid #e4e7ee;
  border-radius: 10px;
  outline: none;

  transition: width 0.2s ${theme.transition.defaultEasing};
`;

const buttonCss = (theme: Theme) => css`
  position: absolute;
  right: calc(16px + 12px);

  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    fill: ${theme.colors.primary_200};
  }

  &:disabled > svg {
    fill: ${theme.colors.gray_300};
  }
`;
