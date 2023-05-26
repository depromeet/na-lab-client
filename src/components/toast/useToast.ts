import { useRef, useState } from 'react';

/**
 * toast 사용을 위한 hook입니다.
 *
 * @param duration toast의 지속시간
 * @return isShowing toast의 상태
 * @return showToast 실행하면 toast가 켜짐
 * @return closeToast 실행하면 toast가 닫힘
 * @return setIsShowing isShowing을 직접 업데이트할때 사용하는 setter
 */
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
    showToast,
    closeToast,
    setIsShowing,
  };
};

export default useToast;
