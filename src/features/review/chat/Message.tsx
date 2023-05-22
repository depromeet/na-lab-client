import { type PropsWithChildren } from 'react';
import { css, type Interpolation, type Theme } from '@emotion/react';

import { BODY_1 } from '~/styles/typo';

import { type MessageFrom, type MessageOrder } from './type';

interface Props extends PropsWithChildren {
  from: MessageFrom;
  order: MessageOrder;
}

const Message = ({ from, order, children }: Props) => {
  if (from === 'other') {
    return (
      <p css={[defaultCss, fromOtherCss, BOREDER_RADIUS_POSITION[`${from} ${order}`], MARGIN_BOTTOM_BY_OREDER[order]]}>
        {children}
      </p>
    );
  }

  return (
    <p css={[defaultCss, fromMeCss, BOREDER_RADIUS_POSITION[`${from} ${order}`], MARGIN_BOTTOM_BY_OREDER[order]]}>
      {children}
    </p>
  );
};

export default Message;

const defaultCss = css`
  ${BODY_1}

  width: fit-content;
  max-width: 278px;
  padding: 9px 14px;
  border-radius: 20px;
`;

const fromOtherCss = (theme: Theme) => css`
  align-self: flex-start;
  color: ${theme.colors.black};
  background-color: ${theme.colors.primary_50};
`;

const fromMeCss = (theme: Theme) => css`
  align-self: flex-end;
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary_200};
`;

const BOREDER_RADIUS_POSITION: Record<`${MessageFrom} ${MessageOrder}`, Interpolation<Theme>> = {
  'me single': '',
  'me first': css`
    border-bottom-right-radius: 4px;
  `,
  'me middle': css`
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  `,
  'me end': css`
    border-top-right-radius: 4px;
  `,
  'other single': '',
  'other first': css`
    border-bottom-left-radius: 4px;
  `,
  'other middle': css`
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  `,
  'other end': css`
    border-top-left-radius: 4px;
  `,
};

const MARGIN_BOTTOM_BY_OREDER: Record<MessageOrder, Interpolation<Theme>> = {
  single: css`
    margin-bottom: 8px;
  `,
  first: css`
    margin-bottom: 4px;
  `,
  middle: css`
    margin-bottom: 4px;
  `,
  end: css`
    margin-bottom: 8px;
  `,
};
