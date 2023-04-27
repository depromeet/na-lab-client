import { type ComponentProps } from 'react';
import Link from 'next/link';

import { type InternalPaths } from '~/hooks/router/useInternalRouter';

interface Props extends ComponentProps<typeof Link> {
  /**
   * 내부 링크로 이루어진 유니온 타입입니다. {@link InternalPaths}
   */
  href: InternalPaths;
}

/**
 *
 * @description
 * Next Link를 type safe하게 사용할 수 있는 컴포넌트입니다.
 *
 * @param {Props} {@link Props}
 *
 * @example ```tsx
 * <InternalLink href="/about">About</InternalLink>
 * ```
 */
const InternalLink = ({ children, ...props }: Props) => {
  return <Link {...props}>{children}</Link>;
};

export default InternalLink;
