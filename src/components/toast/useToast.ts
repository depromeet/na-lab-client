import { useRef, useState } from 'react';

const useToast = (duration = 2000) => {
  const [isShowing, setIsShowing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const showToast = () => {
    setIsShowing(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsShowing(false);
    }, duration);
  };

  const closeToast = () => {
    setIsShowing(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return {
    isShowing,
    setIsShowing,
    showToast,
    closeToast,
  };
};

export default useToast;
