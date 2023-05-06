import { useCallback, useEffect, useRef } from 'react';

type LongPressEvent = MouseEvent | TouchEvent;

type LongPressOptions = {
  onLongPress: (event: LongPressEvent) => void;
  onPressStart?: (event: LongPressEvent) => void;
  onPressEnd?: (event: LongPressEvent) => void;
  threshold?: number;
};

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
