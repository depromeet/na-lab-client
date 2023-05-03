import { useRef } from 'react';

const useDebounce = (cb: () => void, ms: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const dispatchDebounce = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    const newTimer = setTimeout(() => {
      cb();
    }, ms);
    timer.current = newTimer;
  };
  return dispatchDebounce;
};

export default useDebounce;
