import { useState } from 'react';
import { css, type Theme } from '@emotion/react';

import Card from '~/features/gallery/Card';
import useGetGalleryList from '~/hooks/api/gallery/useGetGalleryList';
import GalleryHeader from '~/pages/gallery/Header';
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
          <span>업데이트순</span>
          <hr />
          <span>저장 많은 순</span>
        </div>
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

  margin-bottom: 16px;
  padding: 0 7px;

  hr {
    display: block;

    width: 1px;
    height: 18px;

    background-color: ${theme.colors.gray_50};
    border: none;
  }

  & > span {
    display: block;
    padding: 8px;
  }
`;

const listCss = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 24px;
`;
