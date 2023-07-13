import { type FormEventHandler, useLayoutEffect, useRef, useState } from 'react';
import { css, type Theme } from '@emotion/react';

import { FillEditIcon } from '~/components/icons/EditIcon';
import useBoolean from '~/hooks/common/useBoolean';
import useInput from '~/hooks/common/useInput';
import colors from '~/styles/color';

interface Props {
  onInputSubmit: (text: string) => void;
  value?: string;
}

const Input = ({ onInputSubmit, value }: Props) => {
  const [text, onTextChange] = useInput(value);
  const [isBlur, _, setTrue, setFalse] = useBoolean(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const measuringSpanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(162);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setTrue();

    onInputSubmit(text);
  };

  useLayoutEffect(() => {
    if (measuringSpanRef.current) {
      setInputWidth(measuringSpanRef.current.getBoundingClientRect().width);
    }
  }, [text]);

  return (
    <form onSubmit={onSubmit} onBlur={onSubmit} css={formCss}>
      <input
        ref={inputRef}
        css={(theme) => inputCss(theme, inputWidth)}
        value={text}
        onChange={onTextChange}
        onFocus={setFalse}
        placeholder="EX) UX 디자이너"
      />
      <span ref={measuringSpanRef} css={hiddenCss} aria-hidden="true">
        {text || 'EX) UX 디자이너'}
      </span>
      {isBlur && <FillEditIcon color={colors.gray_300} css={iconCss} />}
    </form>
  );
};

export default Input;

const formCss = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const inputCss = (theme: Theme, inputWidth: number) => css`
  all: unset;

  width: ${inputWidth}px;

  font-size: 1.5rem;
  font-weight: 700;
  line-height: 145%;
  color: ${theme.colors.black};
  letter-spacing: -0.3px;

  caret-color: ${theme.colors.primary_200};

  &::placeholder {
    color: ${theme.colors.gray_300};
  }
`;

const hiddenCss = css`
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;

  font-size: 1.5rem;
  font-weight: 700;
  line-height: 145%;
  letter-spacing: -0.3px;
  white-space: pre;

  opacity: 0;
`;

const iconCss = css`
  padding: 4px;
`;
