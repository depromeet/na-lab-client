import React, { useState } from 'react';
import { css, type Theme } from '@emotion/react';

import Header from '~/components/header/Header';
import BookmarkIcon from '~/components/icons/BookmarkIcon';
import ThreeDotsIcon from '~/components/icons/ThreeDotsIcon';
import useBookmark from '~/features/gallery/useBookmark';
import useGetMyBookmarkList, { type BookmarkedSurveyType } from '~/hooks/api/gallery/useGetMyBookmarkList';
import { BODY_2_REGULAR, HEAD_2_BOLD } from '~/styles/typo';

function BookmarksPage() {
  const { data: myBookmarkList } = useGetMyBookmarkList({ order_type: 'latest' });
  const { addBookmark, cancelBookmark } = useBookmark({ surveyId: props.survey_id });

  const onClick = (isBookmark: boolean) => {
    isBookmarked ? cancelBookmark() : addBookmark();
    setIsBookmarked((prev) => !prev);
  };

  return (
    <main css={containerCss}>
      <Header />
      <ul css={ulCss}>
        {myBookmarkList?.bookmarked_surveys.map((bookmark) => (
          <BookmarkItem key={bookmark.survey_id} {...bookmark} />
        ))}
      </ul>
    </main>
  );
}

export default BookmarksPage;

const containerCss = (theme: Theme) => css`
  width: 100vw;
  max-width: ${theme.size.maxWidth};
  height: 100vh;
  padding-top: 56px;

  background-color: ${theme.colors.gray_50};

  @media screen and (width >= ${theme.size.maxWidth}) {
    position: relative;
    left: -16px;
  }
`;

const ulCss = css`
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: 24px 20px;

  list-style: none;
`;

interface BookmarkItemProps extends BookmarkedSurveyType {
  onClick: (isBookmarked: boolean) => void;
}

function BookmarkItem(props: BookmarkItemProps) {
  const [isBookmarked, setIsBookmarked] = useState(true);

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
          <BookmarkIcon isBookmarked={isBookmarked} size={26} />
        </button>
        <ThreeDotsIcon color="#677089" />
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
