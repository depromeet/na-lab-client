import { css, type Theme } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';

import { MenuBarIcon } from '~/components/icons/MenuIcon';
import MenuSection from '~/components/sideMenu/MenuSection';
import ProfileSection from '~/components/sideMenu/ProfileSection';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function SideMenu(props: Props) {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <>
          <m.aside
            css={containerCss}
            initial={{ x: 260 }}
            animate={{ x: 0 }}
            exit={{ x: 260 }}
            transition={{ duration: 0.3 }}
          >
            <button type="button" css={menuButtonCss} onClick={props.onClose}>
              <MenuBarIcon color="#fff" />
            </button>
            <ProfileSection />
            <hr css={dividerCss} />
            <MenuSection />
          </m.aside>
          <m.div
            onClick={props.onClose}
            css={backdropCss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

export default SideMenu;

const containerCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.fixed};
  top: 0;
  right: 0;
  bottom: 0;

  width: 260px;
  height: 100vh;
  padding-top: 46px;

  background-color: ${theme.colors.secondary_200};
`;

const menuButtonCss = css`
  position: relative;
  top: -18px;

  width: 50px;
  height: 50px;
  padding: 13px;
`;

const dividerCss = (theme: Theme) => css`
  width: calc(100% - 40px);
  height: 1px;
  margin: 24px 20px 42px;

  background-color: ${theme.colors.gray_500};
  border: none;
`;

const backdropCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.belowFixed};
  inset: 0;

  width: 100vw;
  height: 100vh;

  background: rgb(0 0 0 / 50%);
`;
