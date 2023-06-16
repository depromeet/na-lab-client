import { css, type Theme } from '@emotion/react';

import { BODY_2_REGULAR } from '~/styles/typo';

const CollaborationBadge = () => (
  <div css={(theme) => [BODY_2_REGULAR, collaborationBadgeCss(theme)]}>협업했던 팀원</div>
);

const collaborationBadgeCss = (theme: Theme) => css`
  width: fit-content;
  height: 32px;
  padding: 6px 8px;

  color: ${theme.colors.gray_500};

  background-color: ${theme.colors.gray_100};
  border-radius: 8px;
`;

export default CollaborationBadge;
