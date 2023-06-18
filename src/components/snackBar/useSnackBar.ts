import { useCallback } from 'react';
import { useAtom } from 'jotai';

import { type SnackBarProps, snackBarsAtom } from '~/store/snackBar';

type SnackBarWithoutId = Omit<SnackBarProps, 'id'>;

interface FireSnackBarProps extends SnackBarWithoutId {
  duration?: number;
}

const useSnackBar = () => {
  const [snackBars, setSnackBars] = useAtom(snackBarsAtom);

  const fireSnackBar = useCallback(
    ({ content, onClick, isRenderDeleteElement = true, deleteElement = '닫기', duration }: FireSnackBarProps) => {
      const id = new Date().getTime().toString();
      setSnackBars((prev) => [...prev, { id, content, onClick, isRenderDeleteElement, deleteElement }]);

      if (duration) {
        setTimeout(() => {
          setSnackBars((prev) => prev.filter((snackBar) => snackBar.id !== id));
        }, duration);
      }
    },
    [setSnackBars],
  );

  const removeSnackBarById = useCallback(
    (id: string) => {
      setSnackBars((prev) => prev.filter((snackBar) => snackBar.id !== id));
    },
    [setSnackBars],
  );

  return { snackBars, fireSnackBar, removeSnackBarById };
};

export default useSnackBar;
