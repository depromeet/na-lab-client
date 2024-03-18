import { css, type Theme } from '@emotion/react';

import Header from '~/components/header/Header';
import BookmarkIcon from '~/components/icons/BookmarkIcon';
import MinusCircleIcon from '~/components/icons/MinusCircleIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import useGetMyBookmarkList, { type BookmarkedSurveyType } from '~/hooks/api/gallery/useGetMyBookmarkList';
import { useCancelBookmark } from '~/hooks/api/gallery/usePostBookmark';
import { BODY_2_REGULAR, HEAD_2_BOLD } from '~/styles/typo';

function BookmarksPage() {
  const { data: myBookmarkList, refetch } = useGetMyBookmarkList({ order_type: 'latest' });

  return (
    <main css={containerCss}>
      <Header title="저장한 명함" />
      <ul css={ulCss}>
        {myBookmarkList?.bookmarked_surveys.map((bookmark) => (
          <BookmarkItem key={bookmark.survey_id} {...bookmark} listRefetch={refetch} />
        ))}
      </ul>
    </main>
  );
}

export default BookmarksPage;

const containerCss = (theme: Theme) => css`
  position: relative;
  left: -16px;

  width: 100vw;
  max-width: ${theme.size.maxWidth};
  height: 100vh;
  padding-top: 56px;

  background-color: ${theme.colors.gray_50};
`;

const ulCss = css`
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: 24px 20px;

  list-style: none;
`;

interface BookmarkItemProps extends BookmarkedSurveyType {
  listRefetch: () => void;
}

function BookmarkItem(props: BookmarkItemProps) {
  const { fireToast } = useToast();

  const { mutate: cancelBookmark } = useCancelBookmark(props.survey_id, {
    onSuccess: () => {
      fireToast({
        content: (
          <>
            <MinusCircleIcon />
            <Toast.Text>저장한 명함 목록에서 삭제했어요</Toast.Text>
          </>
        ),
        duration: 2000,
      });

      props.listRefetch?.();
    },
  });

  const onClick = () => {
    cancelBookmark();
  };

  return (
    <li css={bookmarkItemCss}>
      <div css={infoWrapperCss}>
        <div css={profileImageCss}></div>
        <div>
          <h4>{props.nickname}</h4>
          <p>{props.position}</p>
        </div>
      </div>
      <div css={buttonWrapperCss}>
        <button type="button" onClick={onClick}>
          <BookmarkIcon isBookmarked={true} size={26} />
        </button>
        {/* TODO : three dot 메뉴 추가
        <ThreeDotsIcon color="#677089" />
      */}
      </div>
    </li>
  );
}

const bookmarkItemCss = css`
  display: flex;
  padding: 18px 20px;
  background-color: #fff;
  border-radius: 12px;
`;

const infoWrapperCss = (theme: Theme) => css`
  display: flex;
  flex: 1;
  gap: 16px;
  align-items: center;

  h4 {
    ${HEAD_2_BOLD};
    color: ${theme.colors.black};
  }

  p {
    margin-top: 2px;
    ${BODY_2_REGULAR};
    color: ${theme.colors.secondary_200};
  }
`;

const profileImageCss = css`
  overflow: hidden;

  width: 56px;
  height: 56px;

  background-color: #dce9fb;
  border-radius: 50%;
`;

const buttonWrapperCss = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;
