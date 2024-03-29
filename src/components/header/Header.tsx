import { type ReactNode } from 'react';
import { useRouter } from 'next/router';
import { css, type Interpolation, type Theme } from '@emotion/react';

import ArrowIcon from '~/components/icons/ArrowIcon';
import { HEAD_2_BOLD } from '~/styles/typo';

interface Props {
  title?: string;
  rightButton?: ReactNode;
  onBackClick?: () => void;
  isContainRemainer?: boolean;
  backIcon?: ReactNode;
  overrideCss?: Interpolation<Theme>;
}

const Header = ({ title, rightButton, onBackClick, isContainRemainer, backIcon, overrideCss }: Props) => {
  const router = useRouter();

  const onBack = () => {
    onBackClick ? onBackClick() : router.back();
  };

  return (
    <>
      <header css={[headerCss, fixedTopCss, overrideCss]}>
        <button type="button" onClick={onBack} css={iconButtonCss}>
          {backIcon ? backIcon : <ArrowIcon />}
        </button>
        {title && <h1 css={[HEAD_2_BOLD, titleCss]}>{title}</h1>}
        {rightButton}
      </header>
      {isContainRemainer && <div css={remainerCss} />}
    </>
  );
};

export default Header;

const iconButtonCss = css`
  all: unset;
  cursor: pointer;
`;

const titleCss = css`
  position: absolute;
  right: 0;
  left: 0;

  width: fit-content;
  margin: auto;
`;

const fixedTopCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.fixed};
  top: 0;
  right: 0;
  left: 0;

  width: 100%;
  max-width: ${theme.size.maxWidth};
  margin: 0 auto;
`;

const headerCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 56px;
  padding: 0.875rem 1rem;

  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray_50};
`;

const remainerCss = css`
  height: 56px;
`;
