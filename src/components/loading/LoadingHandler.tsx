import { type ComponentProps, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

interface Props extends ComponentProps<typeof AnimatePresence> {
  isLoading: boolean;
  /**
   * @description isLoading이 true일 시 그려질 ReactNode 입니다.
   */
  fallback: ReactNode;
}

/**
 * @description AnimatePresence와 함께 isLoading일 시 fallback을 그려주는 컴포넌트입니다.
 * @example
 * ```tsx
 * const {isLoading, data} = useQuery('foo');
 *
 * return (
 *   <LoadingHandler isLoading={isLoading} fallback={<div>로딩중...</div>}>
 *     <div>{data}</div>
 *   </LoadingHandler>
 * )
 * ```
 */
const LoadingHandler = ({ children, isLoading, fallback, mode = 'wait', ...rest }: Props) => {
  return (
    <AnimatePresence mode={mode} {...rest}>
      {isLoading ? fallback : children}
    </AnimatePresence>
  );
};

export default LoadingHandler;
