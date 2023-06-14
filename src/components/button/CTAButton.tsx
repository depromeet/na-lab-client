/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';
import { css } from '@emotion/react';

import { noneUserSelect } from '~/styles/common';

import Button from './Button';

/**
 * @description `Button`에 `width: 100%`를 적용한 버튼 입니다.
 */
const CTAButton = ({ children, ...rest }: ComponentProps<typeof Button>) => {
  return (
    <Button css={ctaCss} {...rest}>
      {children}
    </Button>
  );
};

export default CTAButton;

const ctaCss = css`
  ${noneUserSelect}

  width: 100%;
`;
