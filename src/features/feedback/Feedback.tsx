import { css, type Theme } from '@emotion/react';

import { POSITION } from '~/constants/position';
import { BODY_1, BODY_2_REGULAR } from '~/styles/typo';

import CollaborationBadge from './CollaborationBadge';
import UnreadBadgeIcon from './UnreadBadgeIcon';

type Position = 'developer' | 'designer' | 'product-manager' | 'other';

interface Reviewer {
  reviewer_id: number;
  nickname: string;
  collaboration_experience: boolean;
  position: Position;
}

interface Props {
  reply: string[];
  is_read: boolean;
  reviewer: Reviewer;
}

const Feedback = ({ reply, is_read, reviewer: { nickname, collaboration_experience, position } }: Props) => {
  return (
    <div css={containerCss}>
      {is_read && <UnreadBadgeIcon floatingTop="12px" floatingRight="12px" size="small" />}
      <p css={replyCss}>
        {reply.map((item, idx) => {
          return item + (reply.length !== idx && '\n');
        })}
      </p>
      <div css={badgeContainerCss}>
        <AnonymousPositionBadge position={position} nickname={nickname} />
        {collaboration_experience && <CollaborationBadge />}
      </div>
    </div>
  );
};

export default Feedback;

const containerCss = ({ colors }: Theme) => css`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 35px;

  padding: 21px;

  background-color: ${colors.white};
  border-radius: 8px;
`;

const replyCss = css`
  ${BODY_1};

  white-space: pre-wrap;
`;

const badgeContainerCss = css`
  display: flex;
  gap: 7px;
`;

const BACKGROUND_COLOR_BY_POSITION = (position: Position, theme: Theme) => {
  switch (position) {
    case 'developer':
      return theme.colors.skyblue;
    case 'designer':
      return theme.colors.pink;
    case 'product-manager':
      return theme.colors.bluegreen;
    case 'other':
      return theme.colors.yellowgreen;
  }
};

const AnonymousPositionBadge = ({ position, nickname }: { position: Position; nickname: string }) => (
  <div css={(theme: Theme) => AnonymousPositionBadgeCss(theme, position)}>{POSITION[position] + ' ' + nickname}</div>
);

const AnonymousPositionBadgeCss = (theme: Theme, position: Position) => css`
  ${BODY_2_REGULAR};

  width: fit-content;
  height: 32px;
  padding: 6px 8px;

  color: ${theme.colors.secondary_200};

  background-color: ${BACKGROUND_COLOR_BY_POSITION(position, theme)};
  border-radius: 8px;
`;
