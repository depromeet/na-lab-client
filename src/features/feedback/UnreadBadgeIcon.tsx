import { css } from '@emotion/react';

import Svg from '~/components/svg/Svg';

interface Props {
  floatingTop?: string;
  floatingBottom?: string;
  floatingLeft?: string;
  floatingRight?: string;
}

const UnreadBadgeIcon = ({ floatingTop, floatingBottom, floatingLeft, floatingRight }: Props) => {
  return (
    <Svg width={10} height={10} css={floatingCss({ floatingTop, floatingBottom, floatingLeft, floatingRight })}>
      <circle cx="5" cy="5" r="5" fill="#F85B81" />
    </Svg>
  );
};

export default UnreadBadgeIcon;

const floatingCss = ({ floatingTop, floatingBottom, floatingLeft, floatingRight }: Props) => css`
  position: absolute;
  inset: ${floatingTop ?? 'auto'} ${floatingRight ?? 'auto'} ${floatingBottom ?? 'auto'} ${floatingLeft ?? 'auto'};
`;
