import { css, type Theme } from '@emotion/react';

export type GalleryTabType = 'all' | 'developer' | 'designer' | 'pm';

const TABS: {
  title: string;
  id: GalleryTabType;
}[] = [
  {
    title: '전체',
    id: 'all',
  },

  {
    title: '개발자',
    id: 'developer',
  },
  {
    title: '디자이너',
    id: 'designer',
  },
  {
    title: '기획자',
    id: 'pm',
  },
];

interface Props {
  activeTab: GalleryTabType;
  onClick: (id: GalleryTabType) => void;
}

function Tab(props: Props) {
  return (
    <article css={tabContainerCss}>
      {TABS.map((tab) => (
        <TabItem
          key={tab.id}
          title={tab.title}
          isActive={tab.id === props.activeTab}
          onClick={() => props.onClick(tab.id)}
        />
      ))}
    </article>
  );
}

export default Tab;

const tabContainerCss = css`
  padding: 0 7px;
`;

interface TabItemProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

function TabItem(props: TabItemProps) {
  return (
    <button type="button" css={(theme) => itemCss(theme, props.isActive)} onClick={props.onClick}>
      {props.title}
    </button>
  );
}

const itemCss = (theme: Theme, isActive: boolean) => css`
  padding: 0 10px 14px;
  color: ${isActive ? theme.colors.gray_500 : theme.colors.gray_300};
  border-bottom: 2px solid ${isActive ? theme.colors.gray_500 : 'transparent'};
  transition: border-bottom 0.2s ease-in-out, color 0.2s ease-in-out;
`;
