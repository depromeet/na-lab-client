import { useRouter } from 'next/router';
import { css, type Theme } from '@emotion/react';

import ArrowIcon from '~/components/icons/ArrowIcon';
import { HEAD_2_BOLD } from '~/styles/typo';

interface Props {
  title?: string;
  rightButton?: React.ReactNode;
  onBackClick?: () => void;
}

const Header = ({ title, rightButton, onBackClick }: Props) => {
  const router = useRouter();

  const onBack = () => {
    onBackClick ? onBackClick() : router.back();
  };

  return (
    <header css={[headerCss, fixedTopCss]}>
      <button type="button" onClick={onBack} css={iconButtonCss}>
        <ArrowIcon />
      </button>
      {title && <h1 css={[HEAD_2_BOLD, titleCss]}>{title}</h1>}
      {rightButton}
    </header>
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
  z-index: 1;
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

  height: 48px;
  padding: 16px;

  border: 1px solid ${theme.colors.gray_50};
`;
