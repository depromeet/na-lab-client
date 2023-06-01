import { type ReactElement, useCallback } from 'react';
import { useAtom } from 'jotai';

import { toastAtom } from '~/store/toast';

interface FireToast {
  content: string | ReactElement;
  duration?: number;
  higherThanCTA?: boolean;
}

const DEFAULT_DURATION = 1500;

const useToast = () => {
  const [toast, setToast] = useAtom(toastAtom);

  const removeToast = useCallback((id: string) => {
    setToast((prev) => {
      if (!prev) return null;
      if (prev.id === id) return null;

      return prev;
    });
  }, []);

  const fireToast = useCallback(({ content, duration = DEFAULT_DURATION, higherThanCTA }: FireToast) => {
    const id = new Date().getTime().toString();
    setToast({ id, content, higherThanCTA });
    setTimeout(() => removeToast(id), duration);
  }, []);

  return { toast, fireToast };
};

export default useToast;
