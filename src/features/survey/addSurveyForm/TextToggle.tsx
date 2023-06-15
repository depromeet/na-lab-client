import { memo } from 'react';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import { HEAD_3_SEMIBOLD } from '~/styles/typo';

export interface TextToggleItem {
  type: string;
  label: string;
}

interface Props {
  list: [TextToggleItem, TextToggleItem];
  selectItem: string;
  onItemClick: (type: string) => void;
}

const TextToggle = ({ selectItem, list, onItemClick }: Props) => {
  const isActivated = selectItem === list[0].type;

  return (
    <button type="button" css={containerCss}>
      <m.div css={(theme) => selectBoxCss(theme, isActivated)} layout />
      {list.map(({ label, type }) => {
        const isSelected = type === selectItem;

        return (
          <button type="button" onClick={() => onItemClick(type)} css={itemCss} key={label}>
            <span css={(theme) => textCss(theme, isSelected)}>{label}</span>
          </button>
        );
      })}
    </button>
  );
};

function textTogglePropsAreEqual(prev: Props, next: Props) {
  return prev.selectItem === next.selectItem;
}

export default memo(TextToggle, textTogglePropsAreEqual);

const ITEM_SIZE = 105;

const textCss = (theme: Theme, isSelected: boolean) => css`
  ${HEAD_3_SEMIBOLD};

  position: relative;
  z-index: ${theme.zIndex.above(theme.zIndex.aboveDefault)};
  color: ${isSelected ? theme.colors.white : theme.colors.gray_400};
`;

const itemCss = (theme: Theme) => css`
  position: relative;

  width: 105px;
  height: 32px;

  background-color: ${theme.colors.gray_50};
  border: none;
  border-radius: 24px;
`;

const containerCss = (theme: Theme) => css`
  position: relative;

  display: flex;
  gap: 4px;

  width: calc(${ITEM_SIZE}px * 2 + 10px);
  padding: 5px;

  background-color: ${theme.colors.gray_50};
  border-radius: 34px;
`;

const selectBoxCss = (theme: Theme, isOn: boolean) => css`
  ${isOn
    ? css`
        left: 5px;
      `
    : css`
        right: 5px;
      `}

  position: absolute;
  z-index: ${theme.zIndex.above(theme.zIndex.aboveDefault)};
  top: 5px;

  width: ${ITEM_SIZE}px;
  height: 32px;

  background-color: ${theme.colors.primary_200};
  border-radius: 24px;
`;
