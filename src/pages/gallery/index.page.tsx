import { useState } from 'react';
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
import { type FilterType, type PositionType } from '~/remotes/gallery';
import { BODY_2_BOLD } from '~/styles/typo';

function Gallery() {
  const { isSuccess: isMyCardExist, refetch: myCardInfoRefetch } = useGetMyCard();

  // TODO : 무한 스크롤
  const [page, _] = useState(0);
  const [activeTab, setActiveTab] = useState<PositionType>('ALL');
  const [filterTab, setFilterTab] = useState<FilterType>('update');

  const { data: myBookmarkList } = useGetMyBookmarkList({ order_type: 'latest' });
  console.log('data: ', myBookmarkList);
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
        {data && (
          <StaggerWrapper wrapperOverrideCss={listCss} key={activeTab}>
            {!isMyCardExist && <PublishMyCard onSubmit={onSubmitMyCard} />}
            {data.galleries.length === 0 && <span css={BODY_2_BOLD}>등록된 명함이 없습니다.</span>}
            {data.galleries.map((gallery) => (
              <Card key={gallery.gallery_id} survey={gallery.survey} target={gallery.target} isBookmarked={false} />
            ))}
          </StaggerWrapper>
        )}
      </div>
    </div>
  );
}

export default Gallery;

const contentCss = css`
  padding: 24px 4px 72px;
`;

const listCss = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: stretch;
`;
