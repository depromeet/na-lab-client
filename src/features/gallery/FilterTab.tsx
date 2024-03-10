import { css, type Theme } from '@emotion/react';

import AlignUpdatedIcon from '~/components/icons/AlignUpdatedIcon';
import type Svg from '~/components/svg/Svg';
import { type FilterType } from '~/remotes/gallery';

const TABS: {
  title: string;
  id: FilterType;
  Icon?: typeof Svg;
}[] = [
  {
    title: '업데이트순',
    id: 'update',
    Icon: AlignUpdatedIcon,
  },
  {
    title: '저장 많은 순',
    id: 'bookmark',
  },
];

interface Props {
  filterTab: FilterType;
  setFilterTab: (id: FilterType) => void;
}

function FilterTab(props: Props) {
  return (
    <div css={filterWrapperCss}>
      {TABS.map((tab, idx) => (
        <>
          {idx !== 0 && <hr />}
          <button
            type="button"
            key={'tab' + tab.id}
            onClick={() => props.setFilterTab(tab.id)}
            css={(theme) => tabItemCss(theme, props.filterTab === tab.id)}
          >
            {tab.Icon && <tab.Icon color={props.filterTab === tab.id ? 'black' : 'gray_300'} />}
            {tab.title}
          </button>
        </>
      ))}
    </div>
  );
}

export default FilterTab;

const tabItemCss = (theme: Theme, isActive: boolean) => css`
  display: inline-flex;
  gap: 4px;
  align-items: center;

  padding: 8px;

  color: ${isActive ? theme.colors.black : theme.colors.gray_300};

  transition: color 0.2s ease-in-out;

  &:not(:last-child) {
    &::after {
      content: '';

      display: block;

      width: 1px;
      height: 18px;

      background-color: ${theme.colors.gray_50};
      border: none;
    }
  }
`;

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
`;
