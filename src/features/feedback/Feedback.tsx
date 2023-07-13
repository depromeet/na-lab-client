import { css, type Theme } from '@emotion/react';

import BookmarkIcon from '~/components/icons/BookmarkIcon';
import { Tooltip } from '~/components/tooltip';
import { POSITION } from '~/constants/position';
import usePatchBookmark from '~/hooks/api/feedbacks/usePatchBookmark';
import { BODY_1, BODY_2_REGULAR } from '~/styles/typo';

import CollaborationBadge from './CollaborationBadge';
import UnreadBadgeIcon from './UnreadBadgeIcon';

interface Props {
  form_question_feedback_id: string;
  reply: string[];
  is_read: boolean;
  is_bookmarked: boolean;
  reviewer: Reviewer;
  /**
   * @default false
   * @description 북마크 가능 여부
   */
  isBookmarkable?: boolean;
  withBookmarkTooltip?: boolean;
}

const Feedback = ({
  form_question_feedback_id,
  reply,
  is_read,
  is_bookmarked = false,
  isBookmarkable,
  withBookmarkTooltip = false,
  reviewer: { nickname, collaboration_experience, position },
}: Props) => {
  const { mutate } = usePatchBookmark(form_question_feedback_id);

  return (
    <div css={containerCss}>
      {!is_read && <UnreadBadgeIcon floatingTop="12px" floatingRight="12px" size="small" />}
      <p css={replyCss}>
        {reply.map((item, idx) => {
          return item + (reply.length !== idx && '\n');
        })}
      </p>
      <div css={bottomAreaCss}>
        <div css={badgeContainerCss}>
          <AnonymousPositionBadge position={position} nickname={nickname} />
          {collaboration_experience && <CollaborationBadge />}
        </div>
        {isBookmarkable &&
          (withBookmarkTooltip ? (
            <Tooltip message="북마크하면 피드백이 커리어 명함에 추가돼요!" placement="top" contentPositionByRatio={1}>
              <button type="button" css={bookmarkIconCss} onClick={() => mutate()}>
                <BookmarkIcon isBookmarked={is_bookmarked} />
              </button>
            </Tooltip>
          ) : (
            <button type="button" css={bookmarkIconCss} onClick={() => mutate()}>
              <BookmarkIcon isBookmarked={is_bookmarked} />
            </button>
          ))}
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
  flex-shrink: 0;
  gap: 7px;
`;

const bottomAreaCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BACKGROUND_COLOR_BY_POSITION = (position: ReviewerPosition, theme: Theme) => {
  switch (position) {
    case 'developer':
      return theme.colors.skyblue;
    case 'designer':
      return theme.colors.pink;
    case 'pm':
      return theme.colors.bluegreen;
    case 'others':
      return theme.colors.yellowgreen;
  }
};

const AnonymousPositionBadge = ({ position, nickname }: { position: ReviewerPosition; nickname: string }) => (
  <div css={(theme: Theme) => AnonymousPositionBadgeCss(theme, position)}>{POSITION[position] + ' ' + nickname}</div>
);

const AnonymousPositionBadgeCss = (theme: Theme, position: ReviewerPosition) => css`
  ${BODY_2_REGULAR};

  width: fit-content;
  height: 32px;
  padding: 6px 8px;

  color: ${theme.colors.secondary_200};

  background-color: ${BACKGROUND_COLOR_BY_POSITION(position, theme)};
  border-radius: 8px;
`;

const bookmarkIconCss = css`
  position: absolute;
  right: 21px;
  bottom: 16px;
`;
