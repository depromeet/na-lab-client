import { css } from '@emotion/react';

import HomeIcon from '~/components/icons/HomeIcon';
import InternalLink from '~/components/link/InternalLink';

const IntroHeader = () => {
  return (
    <header css={headerCss}>
      <InternalLink href="/">
        <HomeIcon />
      </InternalLink>
    </header>
  );
};

export default IntroHeader;

const headerCss = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
`;
