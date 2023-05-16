import { useRouter } from 'next/router';
import { css, type Theme } from '@emotion/react';

import { HEAD_2_BOLD } from '~/styles/typo';

interface Props {
  title?: string;
  rightButton?: React.ReactNode;
}
const Header = ({ title, rightButton }: Props) => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  return (
    <header css={[headerCss, fixedTopCss]}>
      <button type="button" onClick={onBack} css={iconButtonCss}>
        <BackIcon />
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

const headerCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 48px;
  padding: 16px;
`;

// TODO : 아이콘으로 대체
const BackIcon = () => {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.70711 0.292893C9.09763 0.683417 9.09763 1.31658 8.70711 1.70711L3.41421 7H19C19.5523 7 20 7.44772 20 8C20 8.55228 19.5523 9 19 9H3.41421L8.70711 14.2929C9.09763 14.6834 9.09763 15.3166 8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071L0.292893 8.70711C-0.0976311 8.31658 -0.0976311 7.68342 0.292893 7.29289L7.29289 0.292893C7.68342 -0.0976311 8.31658 -0.0976311 8.70711 0.292893Z"
        fill="#3D4350"
      />
    </svg>
  );
};
