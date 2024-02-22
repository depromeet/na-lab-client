import { useState } from 'react';
import { css } from '@emotion/react';

import Card from '~/features/gallery/Card';
import useGetGalleryList from '~/hooks/api/gallery/useGetGalleryList';
import FilterTab from '~/pages/gallery/FilterTab';
import GalleryHeader from '~/pages/gallery/Header';
import PublishMyCard from '~/pages/gallery/PublishMyCard';
import Tab, { type GalleryTabType } from '~/pages/gallery/Tab';

function Gallery() {
  const { data } = useGetGalleryList({});

  const [activeTab, setActiveTab] = useState<GalleryTabType>('all');
  const [filterTab, setFilterTab] = useState('updated');

  return (
    <div>
      <GalleryHeader />
      <Tab activeTab={activeTab} onClick={setActiveTab} />
      <div css={listCss}>
        <FilterTab filterTab={filterTab} setFilterTab={setFilterTab} />
        <PublishMyCard />
        {data.gallerys.map((gallery) => (
          <Card key={gallery.gallery_id} gallery={gallery} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;

const listCss = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px 4px 72px;
`;
