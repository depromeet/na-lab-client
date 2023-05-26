import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import { HEAD_3_SEMIBOLD } from '~/styles/typo';

interface Props {
  list: {
    type: string;
    label: string;
  }[];
  selectItem: string;
  onItemClick: (type: string) => void;
}

const TextToggle = ({ selectItem, list, onItemClick }: Props) => {
  return (
    <div>
      <m.div animate css={containerCss}>
        {list.map(({ label, type }) => {
          const isSelected = type === selectItem;

          return (
            <button type="button" onClick={() => onItemClick(type)} css={itemCss} key={label}>
              {isSelected ? <m.div animate css={itemBoxCss} layoutId="underline" /> : null}
              <span css={(theme) => textCss(theme, isSelected)}>{label}</span>
            </button>
          );
        })}
      </m.div>
    </div>
  );
};

const textCss = (theme: Theme, isSelected: boolean) => css`
  ${HEAD_3_SEMIBOLD};

  color: ${isSelected ? theme.colors.white : theme.colors.gray_400};
`;

const itemCss = (theme: Theme) => css`
  position: relative;

  width: 105px;
  height: 32px;

  background-color: ${theme.colors.gray_50};
  border: none;
  border-radius: 24px;

  span {
    position: relative;
    z-index: 2;
  }
`;

const itemBoxCss = (theme: Theme) => css`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  width: 105px;
  height: 32px;

  background-color: ${theme.colors.primary_200};
  border-radius: 24px;
`;

const containerCss = (theme: Theme) => css`
  display: flex;
  gap: 4px;

  width: fit-content;
  padding: 5px;

  background-color: ${theme.colors.gray_50};
  border-radius: 34px;
`;

export default TextToggle;
