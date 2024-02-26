import { useState } from 'react';
import { css } from '@emotion/react';

import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import Card from '~/features/gallery/Card';
import useGetGalleryList from '~/hooks/api/gallery/useGetGalleryList';
import FilterTab, { type FilterType } from '~/pages/gallery/FilterTab';
import GalleryHeader from '~/pages/gallery/Header';
import PublishMyCard from '~/pages/gallery/PublishMyCard';
import Tab, { type GalleryTabType } from '~/pages/gallery/Tab';

function Gallery() {
  const { data } = useGetGalleryList({});

  const [activeTab, setActiveTab] = useState<GalleryTabType>('all');
  const [filterTab, setFilterTab] = useState<FilterType>('updated');

  return (
    <div>
      <GalleryHeader />
      <Tab activeTab={activeTab} onClick={setActiveTab} />
      <div key={activeTab}>
        <StaggerWrapper wrapperOverrideCss={listCss}>
          <div>
            <FilterTab filterTab={filterTab} setFilterTab={setFilterTab} />
            <PublishMyCard />
          </div>
          {data.gallerys.map((gallery) => (
            <Card key={gallery.gallery_id} gallery={gallery} />
          ))}
        </StaggerWrapper>
      </div>
    </div>
  );
}

export default Gallery;

const listCss = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: stretch;

  padding: 24px 4px 72px;
`;
