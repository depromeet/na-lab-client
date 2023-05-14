import { type PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';

import useDidMount from '~/hooks/lifeCycle/useDidMount';

/**
 * @description react.createPortal을 이용해 document.body에 children을 렌더링합니다
 */
const Portal = ({ children }: PropsWithChildren) => {
  const [container, setContainer] = useState<Element | null>(null);

  useDidMount(() => {
    if (document) {
      setContainer(document.body);
    }
  });

  if (!container) return null;

  return createPortal(children, container);
};

export default Portal;
