import { cleanup, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import useLongPress from './useLongPress';

describe('hooks/common/useLongPress', () => {
  test('정의되어 있는가', () => {
    expect(useLongPress).toBeDefined();
  });

  describe('useLongPress in pc', () => {
    const onLongPressMock = vi.fn();
    const onPressStartMock = vi.fn();
    const onPressEndMock = vi.fn();

    beforeEach(() => {
      vi.useFakeTimers();
      onLongPressMock.mockClear();
      onPressStartMock.mockClear();
      onPressEndMock.mockClear();
    });

    afterEach(cleanup);

    test('threshold 동안 누르고 있으면 onLongPress가 실행된다', () => {
      const ref = { current: document.createElement('div') };
      renderHook(() => useLongPress(ref, { onLongPress: onLongPressMock, threshold: 500 }));
      const element = ref.current;

      fireEvent.mouseDown(element);
      expect(onLongPressMock).not.toHaveBeenCalled();
      vi.advanceTimersByTime(499);
      expect(onLongPressMock).not.toHaveBeenCalled();

      fireEvent.mouseDown(element);
      vi.advanceTimersByTime(500);
      expect(onLongPressMock).toHaveBeenCalled();
    });

    test('누름과 동시에 onPressStart가 실행되고, 떼면 onPressEnd가 실행된다', () => {
      const ref = { current: document.createElement('div') };
      renderHook(() =>
        useLongPress(ref, {
          onLongPress: onLongPressMock,
          onPressStart: onPressStartMock,
          onPressEnd: onPressEndMock,
          threshold: 500,
        }),
      );
      const element = ref.current;

      fireEvent.mouseDown(element);
      expect(onPressStartMock).toHaveBeenCalled();
      fireEvent.mouseUp(element);
      expect(onPressEndMock).toHaveBeenCalled();
    });

    test('누르다가 취소될 경우 onPressEnd와 onLongPress가 모두 실행되지 않는다', () => {
      const ref = { current: document.createElement('div') };
      renderHook(() =>
        useLongPress(ref, {
          onLongPress: onLongPressMock,
          onPressStart: onPressStartMock,
          onPressEnd: onPressEndMock,
          threshold: 500,
        }),
      );
      const element = ref.current;

      fireEvent.mouseDown(element);
      expect(onPressStartMock).toHaveBeenCalled();
      fireEvent.mouseLeave(element);
      vi.advanceTimersByTime(500);
      expect(onPressEndMock).not.toHaveBeenCalled();
      expect(onLongPressMock).not.toHaveBeenCalled();
    });

    test('대상이 null일 경우 이벤트가 등록되지 않는다', () => {
      const ref = { current: null };
      renderHook(() =>
        useLongPress(ref, {
          onLongPress: onLongPressMock,
          onPressStart: onPressStartMock,
          onPressEnd: onPressEndMock,
          threshold: 500,
        }),
      );

      expect(ref.current?.ontouchstart).toBeUndefined();
      expect(ref.current?.ontouchend).toBeUndefined();
      expect(ref.current?.ontouchcancel).toBeUndefined();
      expect(ref.current?.onmousedown).toBeUndefined();
      expect(ref.current?.onmouseup).toBeUndefined();
      expect(ref.current?.onmouseleave).toBeUndefined();
    });

    test('unmount되면 이벤트가 제거된다', () => {
      const ref = { current: document.createElement('div') };
      const { unmount } = renderHook(() =>
        useLongPress(ref, {
          onLongPress: onLongPressMock,
          onPressStart: onPressStartMock,
          onPressEnd: onPressEndMock,
          threshold: 500,
        }),
      );
      const element = ref.current;
      const removeEventListener = vi.spyOn(element, 'removeEventListener');

      unmount();

      expect(removeEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith('mouseleave', expect.any(Function));
    });
  });

  describe('useLongPress in mobile', () => {
    const onLongPressMock = vi.fn();
    const onPressStartMock = vi.fn();
    const onPressEndMock = vi.fn();

    beforeEach(() => {
      global.ontouchstart = vi.fn();
      vi.useFakeTimers();
      onLongPressMock.mockClear();
      onPressStartMock.mockClear();
      onPressEndMock.mockClear();
    });

    afterEach(cleanup);

    test('threshold 동안 누르고 있으면 onLongPress가 실행된다', () => {
      const ref = { current: document.createElement('div') };
      renderHook(() => useLongPress(ref, { onLongPress: onLongPressMock, threshold: 500 }));
      const element = ref.current;

      fireEvent.touchStart(element);
      expect(onLongPressMock).not.toHaveBeenCalled();
      vi.advanceTimersByTime(499);
      expect(onLongPressMock).not.toHaveBeenCalled();

      fireEvent.touchStart(element);
      vi.advanceTimersByTime(500);
      expect(onLongPressMock).toHaveBeenCalled();
    });

    test('누름과 동시에 onPressStart가 실행되고, 떼면 onPressEnd가 실행된다', () => {
      const ref = { current: document.createElement('div') };
      renderHook(() =>
        useLongPress(ref, {
          onLongPress: onLongPressMock,
          onPressStart: onPressStartMock,
          onPressEnd: onPressEndMock,
          threshold: 500,
        }),
      );
      const element = ref.current;

      fireEvent.touchStart(element);
      expect(onPressStartMock).toHaveBeenCalled();
      fireEvent.touchEnd(element);
      expect(onPressEndMock).toHaveBeenCalled();
    });

    test('누르다가 취소될 경우 onPressEnd와 onLongPress가 모두 실행되지 않는다', () => {
      const ref = { current: document.createElement('div') };
      renderHook(() =>
        useLongPress(ref, {
          onLongPress: onLongPressMock,
          onPressStart: onPressStartMock,
          onPressEnd: onPressEndMock,
          threshold: 500,
        }),
      );
      const element = ref.current;

      fireEvent.touchStart(element);
      expect(onPressStartMock).toHaveBeenCalled();
      fireEvent.touchCancel(element);
      vi.advanceTimersByTime(500);
      expect(onPressEndMock).not.toHaveBeenCalled();
      expect(onLongPressMock).not.toHaveBeenCalled();
    });

    test('대상이 null일 경우 이벤트가 등록되지 않는다', () => {
      const ref = { current: null };
      renderHook(() =>
        useLongPress(ref, {
          onLongPress: onLongPressMock,
          onPressStart: onPressStartMock,
          onPressEnd: onPressEndMock,
          threshold: 500,
        }),
      );

      expect(ref.current?.ontouchstart).toBeUndefined();
      expect(ref.current?.ontouchend).toBeUndefined();
      expect(ref.current?.ontouchcancel).toBeUndefined();
      expect(ref.current?.onmousedown).toBeUndefined();
      expect(ref.current?.onmouseup).toBeUndefined();
      expect(ref.current?.onmouseleave).toBeUndefined();
    });

    test('unmount되면 이벤트가 제거된다', () => {
      const ref = { current: document.createElement('div') };
      const { unmount } = renderHook(() =>
        useLongPress(ref, {
          onLongPress: onLongPressMock,
          onPressStart: onPressStartMock,
          onPressEnd: onPressEndMock,
          threshold: 500,
        }),
      );
      const element = ref.current;
      const removeEventListener = vi.spyOn(element, 'removeEventListener');

      unmount();

      expect(removeEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith('touchend', expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith('touchcancel', expect.any(Function));
    });
  });
});
