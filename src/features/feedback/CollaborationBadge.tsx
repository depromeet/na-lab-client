import { css, type Theme } from '@emotion/react';

import { BODY_2_REGULAR } from '~/styles/typo';

const CollaborationBadge = () => <div css={[BODY_2_REGULAR, collaborationBadgeCss]}>협업했던 팀원</div>;

const collaborationBadgeCss = ({ colors }: Theme) => css`
  width: fit-content;
  padding: 6px 8px;

  color: ${colors.white};

  background-color: ${colors.primary_200};
  border-radius: 8px;
`;

export default CollaborationBadge;
