import { useRef } from 'react';

/**
 * 함수에 debounce를 적용하는 hook입니다. ms 이내의 실행을 병합하여 한 번 실행합니다.
 *
 * @param cb debounce 적용을 원하는 함수
 * @param ms debounce timeout
 * @returns debouncedFn
 */
const useDebounce = (cb: () => void, ms: number): (() => void) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const dispatchDebounce = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    const newTimer = setTimeout(cb, ms);
    timer.current = newTimer;
  };

  return dispatchDebounce;
};

export default useDebounce;
