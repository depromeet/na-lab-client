import { css } from '@emotion/react';

import colors from '~/styles/color';
import { BODY_2_REGULAR } from '~/styles/typo';

const CollaborationBadge = ({ variant = 'default' }) => (
  <div css={[BODY_2_REGULAR, collaborationBadgeCss(variant)]}>협업했던 팀원</div>
);

const styles: Record<string, Record<string, string>> = {
  default: {
    color: colors.white,
    backgroundColor: colors.primary_200,
  },
  gray: {
    color: colors.gray_500,
    backgroundColor: colors.gray_100,
  },
};

const collaborationBadgeCss = (variant: string) => css`
  width: fit-content;
  height: 32px;
  padding: 6px 8px;
  border-radius: 8px;
  ${styles[variant]}
`;

export default CollaborationBadge;
