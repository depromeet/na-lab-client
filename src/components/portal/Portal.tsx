import { type PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * @description react.createPortal을 이용해 document.body에 children을 렌더링합니다
 */
const Portal = ({ children }: PropsWithChildren) => {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    if (document) {
      setContainer(document.body);
    }
  }, []);

  if (!container) return null;

  return createPortal(children, container);
};

export default Portal;
