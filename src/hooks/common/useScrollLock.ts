import { useEffect } from 'react';

const useScrollLock = ({ lock }: { lock: boolean }): void => {
  useEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(document.body).overflow;
    if (lock) {
      document.body.style.overflow = 'hidden';
    }

    return () => (document.body.style.overflow = originalStyle);
  }, [lock]);
};

export default useScrollLock;
