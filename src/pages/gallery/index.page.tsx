import { useState } from 'react';
import { css } from '@emotion/react';

import Header from '~/components/header/MobileHeader';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import Card from '~/features/gallery/Card';
import FilterTab, { type FilterType } from '~/features/gallery/FilterTab';
import PublishMyCard from '~/features/gallery/PublishMyCard';
import Tab, { type GalleryTabType } from '~/features/gallery/Tab';
import useGetGalleryList from '~/hooks/api/gallery/useGetGalleryList';
import useGetMyCard from '~/hooks/api/gallery/useGetMyCard';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';

function Gallery() {
  const isMyCardExist = useCheckMyCardExist();

  useDidUpdate(() => {
    if (isMyCardExist) {
      refetch();
    }
  }, [isMyCardExist]);

  const [activeTab, setActiveTab] = useState<GalleryTabType>('all');
  const [filterTab, setFilterTab] = useState<FilterType>('updated');

  const { data, refetch } = useGetGalleryList({});

  /*
   * 내 명함 게시 후 처리
   */
  const onSubmitMyCard = () => {
    refetch();
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

const useCheckMyCardExist = () => {
  const { isSuccess } = useGetMyCard();

  return isSuccess;
};

const contentCss = css`
  padding: 24px 4px 72px;
`;

const listCss = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: stretch;
`;
