/* eslint-disable unicorn/filename-case */
import { type ComponentProps, forwardRef } from 'react';
import { css } from '@emotion/react';

import Button from './Button';

/**
 * @description `Button`에 `width: 100%`를 적용한 버튼 입니다.
 */
const CTAButton = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(({ children, ...rest }, ref) => {
  return (
    <Button css={ctaCss} ref={ref} {...rest}>
      {children}
    </Button>
  );
});

CTAButton.displayName = 'CTAButton';
export default CTAButton;

const ctaCss = css`
  width: 100%;
`;
