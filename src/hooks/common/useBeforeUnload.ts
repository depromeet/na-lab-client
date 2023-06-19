import { useCallback, useEffect } from 'react';

const useBeforeUnload = (enabled: boolean | (() => boolean) = true) => {
  const handler = useCallback(
    (event: BeforeUnloadEvent) => {
      const finalEnabled = typeof enabled === 'function' ? enabled() : true;

      if (!finalEnabled) {
        return;
      }

      event.preventDefault();
    },
    [enabled],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    window.addEventListener('beforeunload', handler);

    return () => window.removeEventListener('beforeunload', handler);
  }, [enabled, handler]);
};

export default useBeforeUnload;
