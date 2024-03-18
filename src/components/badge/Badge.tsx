import { type BaseHTMLAttributes } from 'react';
import { css, type Theme } from '@emotion/react';

import { BODY_1 } from '~/styles/typo';

type Props = BaseHTMLAttributes<HTMLSpanElement>;

const Badge = ({ children, ...rest }: Props) => {
  return (
    <span css={badgeCss} {...rest}>
      {children}
    </span>
  );
};

export default Badge;

const badgeCss = (theme: Theme) => css`
  ${BODY_1};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0 8px;

  color: ${theme.colors.gray_50};

  background-color: ${theme.colors.red_200};
  border-radius: 24px;
`;
