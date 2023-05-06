import { type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

/**
 * @description react.createPortal을 이용해 document.body에 children을 렌더링합니다
 */
const Portal = ({ children }: PropsWithChildren) => {
  const container = typeof window !== 'undefined' && document.body;

  return container ? createPortal(children, container) : null;
};

export default Portal;
