import { css } from '@emotion/react';

import Svg from '~/components/svg/Svg';

interface Props {
  size?: 'small' | 'large';
  floatingTop?: string;
  floatingBottom?: string;
  floatingLeft?: string;
  floatingRight?: string;
}

const UnreadBadgeIcon = ({ size = 'large', floatingTop, floatingBottom, floatingLeft, floatingRight }: Props) => {
  return (
    <Svg
      width={size === 'small' ? 8 : 10}
      height={size === 'small' ? 8 : 10}
      css={floatingCss({ floatingTop, floatingBottom, floatingLeft, floatingRight })}
    >
      <circle
        cx={size === 'small' ? '4' : '5'}
        cy={size === 'small' ? '4' : '5'}
        r={size === 'small' ? '4' : '5'}
        fill="#F85B81"
      />
    </Svg>
  );
};

export default UnreadBadgeIcon;

const floatingCss = ({ floatingTop, floatingBottom, floatingLeft, floatingRight }: Omit<Props, 'size'>) => css`
  position: absolute;
  inset: ${floatingTop ?? 'auto'} ${floatingRight ?? 'auto'} ${floatingBottom ?? 'auto'} ${floatingLeft ?? 'auto'};
`;
