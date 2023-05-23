import { type ComponentProps } from 'react';
import { css } from '@emotion/react';

import CTAButton from '../button/CTAButton';

// eslint-disable-next-line react/display-name
export const CancelButton = ({ children, ...props }: ComponentProps<typeof CTAButton>) => {
  return (
    <CTAButton color="gray" css={dialogButtonCss} {...props}>
      {children}
    </CTAButton>
  );
};

// eslint-disable-next-line react/display-name
export const ConfirmButton = ({ children, ...props }: ComponentProps<typeof CTAButton>) => {
  return (
    <CTAButton color="navy" css={dialogButtonCss} {...props}>
      {children}
    </CTAButton>
  );
};

const dialogButtonCss = css`
  border-radius: 12px;
`;
