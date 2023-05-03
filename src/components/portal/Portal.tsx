import { type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithChildren) => {
  const container = typeof window !== 'undefined' && document.body;

  return container ? createPortal(children, container) : null;
};

export default Portal;
