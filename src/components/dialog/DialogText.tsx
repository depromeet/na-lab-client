import { type PropsWithChildren } from 'react';
import { css, type Interpolation, type Theme } from '@emotion/react';

import { BODY_1, HEAD_1 } from '~/styles/typo';

export const Title = ({ titleCss, children }: PropsWithChildren<{ titleCss?: Interpolation<Theme> }>) => {
  return <span css={[titleBaseCss, titleCss]}>{children}</span>;
};

export const Description = ({
  descriptionCss,
  children,
}: PropsWithChildren<{ descriptionCss?: Interpolation<Theme> }>) => {
  return <span css={[descriptionBaseCss, descriptionCss]}>{children}</span>;
};

const titleBaseCss = ({ colors }: Theme) => css`
  ${HEAD_1}

  color: ${colors.black};
  text-align: left;
  white-space: pre-wrap;
`;

const descriptionBaseCss = css`
  ${BODY_1}

  color: #6b7180;
  text-align: center;
  white-space: pre-wrap;
`;
