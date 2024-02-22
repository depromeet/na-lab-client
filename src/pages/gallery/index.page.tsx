import { useState } from 'react';
import { css, type Theme } from '@emotion/react';

import AlignUpdatedIcon from '~/components/icons/AlignUpdatedIcon';
import Card from '~/features/gallery/Card';
import useGetGalleryList from '~/hooks/api/gallery/useGetGalleryList';
import GalleryHeader from '~/pages/gallery/Header';
import PublishMyCard from '~/pages/gallery/PublishMyCard';
import Tab, { type GalleryTabType } from '~/pages/gallery/Tab';

function Gallery() {
  const { data } = useGetGalleryList({});

  const [activeTab, setActiveTab] = useState<GalleryTabType>('all');

  return (
    <div>
      <GalleryHeader />
      <Tab activeTab={activeTab} onClick={setActiveTab} />
      <div css={listCss}>
        <div css={filterWrapperCss}>
          <span>
            <AlignUpdatedIcon />
            업데이트순
          </span>
          <hr />
          <span>저장 많은 순</span>
        </div>
        <PublishMyCard />
        {data.gallerys.map((gallery) => (
          <Card key={gallery.gallery_id} gallery={gallery} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;

const filterWrapperCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  hr {
    display: block;

    width: 1px;
    height: 18px;

    background-color: ${theme.colors.gray_50};
    border: none;
  }

  & > span {
    display: inline-flex;
    gap: 4px;
    align-items: center;
    padding: 8px;
  }
`;

const listCss = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px 4px 72px;
`;
