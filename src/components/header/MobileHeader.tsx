import { css, type Theme } from '@emotion/react';

import { MenuBarIcon } from '~/components/icons/MenuIcon';
import SideMenu from '~/components/sideMenu/SideMenu';
import useBoolean from '~/hooks/common/useBoolean';
import { HEAD_1_BOLD } from '~/styles/typo';

// NOTE: MobileHeader 임시 네이밍, 추후 수정 필요
interface Props {
  title: string;
  hasMenu?: boolean;
}

function MobileHeader({ title, hasMenu = true }: Props) {
  const [isSideMenuOpen, toggleSideMenu] = useBoolean(false);

  return (
    <>
      <header css={headerCss}>
        <h1>{title}</h1>

        {hasMenu && (
          <button type="button" css={menuButtonCss} onClick={toggleSideMenu}>
            <MenuBarIcon color="#394258" />
          </button>
        )}
      </header>
      <div css={blankCss} />
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
    </>
  );
}

export default MobileHeader;

const menuButtonCss = css`
  height: 48px;
`;

const headerCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.aboveDefault};
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  max-width: ${theme.size.maxWidth};
  height: 60px;
  margin-inline: auto;
  padding: 0 20px;

  background-color: ${theme.colors.white};

  h1 {
    ${HEAD_1_BOLD};
  }
`;

const blankCss = css`
  width: 100%;
  height: 60px;
`;
