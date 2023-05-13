import { useCallback, useEffect, useRef } from 'react';

type LongPressEvent = MouseEvent | TouchEvent;

interface LongPressOptions {
  onLongPress: (event: LongPressEvent) => void;
  onPressStart?: (event: LongPressEvent) => void;
  onPressEnd?: (event: LongPressEvent) => void;
  threshold?: number;
}

/**
 * 마우스나 터치 이벤트가 threshold 동안 유지될 때 콜백 함수를 실행하는 hook
 *
 * @param ref
 * @param options useLongPress 옵션 객체
 * @param options.onLongPress threshold 동안 press가 유지될 때 실행할 함수
 * @param options.onPressStart press가 시작될 때 실행할 함수
 * @param options.onPressEnd press가 종료될 때 실행할 함수
 * @param options.threshold 함수 실행 기준 ms, 기본값은 500ms
 */
const useLongPress = (
  ref: React.RefObject<HTMLElement>,
  { onLongPress, onPressStart, onPressEnd, threshold = 500 }: LongPressOptions,
) => {
  const timeoutRef = useRef<number | undefined>();
  const targetRef = useRef<EventTarget | null>(null);

  const handlePressStart = useCallback(
    (event: LongPressEvent) => {
      targetRef.current = event.target;
      if (onPressStart) onPressStart(event);

      timeoutRef.current = window.setTimeout(() => {
        if (onLongPress && targetRef.current === event.target) {
          onLongPress(event);
        }
      }, threshold);
    },
    [onLongPress, onPressStart, targetRef, threshold],
  );

  const handlePressEnd = useCallback(
    (event: LongPressEvent) => {
      clearTimeout(timeoutRef.current);
      if (onPressEnd && targetRef.current === event.target) {
        onPressEnd(event);
      }
    },
    [onPressEnd, targetRef],
  );

  const handlePressCancel = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, [targetRef]);

  useEffect(() => {
    const currentRef = ref.current;

    if (!currentRef) {
      return;
    }

    if ('ontouchstart' in window) {
      currentRef.addEventListener('touchstart', handlePressStart);
      currentRef.addEventListener('touchend', handlePressEnd);
      currentRef.addEventListener('touchcancel', handlePressCancel);
    } else {
      currentRef.addEventListener('mousedown', handlePressStart);
      currentRef.addEventListener('mouseup', handlePressEnd);
      currentRef.addEventListener('mouseleave', handlePressCancel);
    }

    return () => {
      if ('ontouchstart' in window) {
        currentRef.removeEventListener('touchstart', handlePressStart);
        currentRef.removeEventListener('touchend', handlePressEnd);
        currentRef.removeEventListener('touchcancel', handlePressCancel);
      } else {
        currentRef.removeEventListener('mousedown', handlePressStart);
        currentRef.removeEventListener('mouseup', handlePressEnd);
        currentRef.removeEventListener('mouseleave', handlePressCancel);
      }
    };
  }, [ref, onPressStart, onLongPress, onPressEnd, threshold, handlePressStart, handlePressEnd, handlePressCancel]);
};

export default useLongPress;
