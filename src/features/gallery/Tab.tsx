import { css, type Theme } from '@emotion/react';

import { type PositionType } from '~/remotes/gallery';
import { HEAD_2_BOLD } from '~/styles/typo';

const TABS: {
  title: string;
  id: PositionType;
}[] = [
  {
    title: '전체',
    id: 'ALL',
  },
  {
    title: '기획자',
    id: 'PM',
  },
  {
    title: '개발자',
    id: 'DEVELOPER',
  },
  {
    title: '디자이너',
    id: 'DESIGNER',
  },
  {
    title: '기타',
    id: 'OTHERS',
  },
];

interface Props {
  activeTab: PositionType;
  onClick: (id: PositionType) => void;
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
  margin: 0 7px;
  border-bottom: 2px solid #e4e7ee;
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
  position: relative;
  bottom: -2px;

  padding: 0 10px 14px;

  color: ${isActive ? theme.colors.gray_500 : theme.colors.gray_300};

  border-bottom: 2px solid ${isActive ? theme.colors.gray_500 : 'transparent'};

  transition: border-bottom 0.2s ease-in-out, color 0.2s ease-in-out;
  ${HEAD_2_BOLD};
`;
