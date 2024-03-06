import { css, type Theme } from '@emotion/react';

import { MenuBarIcon } from '~/components/icons/MenuIcon';

// NOTE: MobileHeader 임시 네이밍, 추후 수정 필요
function MobileHeader() {
  return (
    <>
      <header css={headerCss}>
        <button type="button" css={menuButtonCss}>
          <MenuBarIcon color="#394258" />
        </button>
      </header>
      <div css={blankCss} />
    </>
  );
}

export default MobileHeader;

const menuButtonCss = css`
  height: 48px;
  padding: 12px;
`;

const headerCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.aboveDefault};
  top: 0;
  right: 0;
  left: 0;

  width: 100vw;
  max-width: ${theme.size.maxWidth};
  margin-inline: auto;
  padding: 4px 8px;

  background-color: ${theme.colors.white};
`;

const blankCss = css`
  width: 100%;
  height: 56px;
`;
