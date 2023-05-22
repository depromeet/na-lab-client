import { type PropsWithChildren } from 'react';
import { css } from '@emotion/react';

/**
 * @description `_app`에서 적용된 `padding: 0 16px`에서 추가적으로 7px을 더해 23px로 만드는 용의 wrapper 입니다
 * @example
 * ```tsx
 * // index.page.tsx
 * import { type ReactElement } from 'react';
 * import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
 *
 * export default function Index() {
 *  return <div>foo</div>;
 * }
 *
 * Index.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;
 * ```
 */
const LayoutPaddingTo23 = ({ children }: PropsWithChildren) => {
  return <div css={layoutCss}>{children}</div>;
};

export default LayoutPaddingTo23;

const layoutCss = css`
  padding: 0 7px;
`;
