import { useState } from 'react';
import { css } from '@emotion/react';

import Header from '~/components/header/MobileHeader';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import Card from '~/features/gallery/Card';
import FilterTab from '~/features/gallery/FilterTab';
import PublishMyCard from '~/features/gallery/PublishMyCard';
import Tab from '~/features/gallery/Tab';
import useGetGalleryList from '~/hooks/api/gallery/useGetGalleryList';
import useGetMyCard from '~/hooks/api/gallery/useGetMyCard';
import { type FilterType, type PositionType } from '~/remotes/gallery';

function Gallery() {
  const { isSuccess: isMyCardExist, refetch: getMyCardRefetch } = useGetMyCard();

  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState<PositionType>('ALL');
  const [filterTab, setFilterTab] = useState<FilterType>('update');

  const { data, refetch } = useGetGalleryList({
    position: activeTab,
    page,
    order_type: filterTab,
    count: 5,
  });

  /*
   * 내 명함 게시 후 처리
   */
  const onSubmitMyCard = () => {
    refetch();
    getMyCardRefetch();
  };

  return (
    <div>
      <Header />
      <Tab activeTab={activeTab} onClick={setActiveTab} />
      <div css={contentCss}>
        <FilterTab filterTab={filterTab} setFilterTab={setFilterTab} />
        {data && (
          <StaggerWrapper wrapperOverrideCss={listCss}>
            {!isMyCardExist && <PublishMyCard onSubmit={onSubmitMyCard} />}
            {data.galleries.map((gallery) => (
              <Card key={gallery.gallery_id} survey={gallery.survey} target={gallery.target} />
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
