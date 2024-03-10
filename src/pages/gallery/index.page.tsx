import { useState } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';

import Header from '~/components/header/MobileHeader';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import Card from '~/features/gallery/Card';
import FilterTab from '~/features/gallery/FilterTab';
import PublishMyCard from '~/features/gallery/PublishMyCard';
import Tab from '~/features/gallery/Tab';
import useGetGalleryList from '~/hooks/api/gallery/useGetGalleryList';
import useGetMyBookmarkList from '~/hooks/api/gallery/useGetMyBookmarkList';
import useGetMyCard from '~/hooks/api/gallery/useGetMyCard';
import { type FilterType, type GalleryType, type PositionType } from '~/remotes/gallery';
import { BODY_2_BOLD } from '~/styles/typo';

function Gallery() {
  // TODO : 무한 스크롤
  const [page, _] = useState(0);
  const [activeTab, setActiveTab] = useState<PositionType>('ALL');
  const [filterTab, setFilterTab] = useState<FilterType>('update');

  const { data: myCardInfo, isSuccess: isMyCardExist, refetch: myCardInfoRefetch } = useGetMyCard();

  const { data, refetch: galleryListRefetch } = useGetGalleryList({
    position: activeTab,
    page,
    order_type: filterTab,
    count: 5,
  });

  /*
   * 내 명함 게시 후 처리
   */
  const onSubmitMyCard = () => {
    galleryListRefetch();
    myCardInfoRefetch();
  };

  return (
    <div>
      <Header />
      <Tab activeTab={activeTab} onClick={setActiveTab} />
      <div css={contentCss}>
        <FilterTab filterTab={filterTab} setFilterTab={setFilterTab} />
        {!isMyCardExist && <PublishMyCard onSubmit={onSubmitMyCard} />}
        {data && (
          <CardList
            galleries={data.galleries ?? []}
            galleryListRefetch={galleryListRefetch}
            survey_id={myCardInfo?.survey.survey_id ?? ''}
          />
        )}
      </div>
    </div>
  );
}

export default Gallery;

function CardList({
  galleries,
  galleryListRefetch,
  survey_id,
}: {
  galleries: GalleryType[];
  galleryListRefetch: () => void;
  survey_id: string;
}) {
  const { data: myBookmarkList, refetch: myBookmarkListRefetch } = useGetMyBookmarkList({ order_type: 'latest' });
  const myCardSurveyId = survey_id;

  const refetch = () => {
    galleryListRefetch();
    myBookmarkListRefetch();
  };

  if (!myBookmarkList) return null;

  if (galleries.length === 0) {
    return <span css={[BODY_2_BOLD, emptyCss]}>등록된 명함이 없습니다.</span>;
  }

  return (
    <StaggerWrapper wrapperOverrideCss={listCss}>
      {galleries.map((gallery) => {
        const isBookmarked = myBookmarkList.bookmarked_surveys.some(
          (bookmark) => bookmark.survey_id === gallery.survey.survey_id,
        );

        return (
          <Link
            key={gallery.gallery_id}
            href={`/dna/${gallery.survey.survey_id}`}
            passHref
            style={{ all: 'unset', cursor: 'pointer' }}
          >
            <Card
              survey={gallery.survey}
              target={gallery.target}
              isMine={gallery.survey.survey_id === myCardSurveyId}
              isBookmarked={isBookmarked}
              listRefetch={refetch}
            />
          </Link>
        );
      })}
    </StaggerWrapper>
  );
}

const contentCss = css`
  padding: 24px 4px 72px;
`;

const listCss = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: stretch;
`;

const emptyCss = css`
  display: block;
  width: fit-content;
  margin: 20px auto;
`;
