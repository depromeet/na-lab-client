import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { afterEach, describe, expect, test, vi } from 'vitest';

import useDidMount from './useDidMount';

describe('hooks/lifeCycle/useDidMount', () => {
  test('정의되어 있어야 한다', () => {
    expect(useDidMount).toBeDefined();
  });

  test('effectCallback이 실행되어야 한다', () => {
    const effectCallback = vi.fn();
    renderHook(() => useDidMount(effectCallback));
    expect(effectCallback).toBeCalled();
  });

  test('rerender시 1번 실행되어야 한다', () => {
    const effectCallback = vi.fn();
    const { rerender } = renderHook(() => useDidMount(effectCallback));
    rerender();
    expect(effectCallback).toBeCalledTimes(1);
  });

  describe('useDidMount Component', () => {
    const BUTTON_TEXT = 'change';
    const mockCallback = vi.fn();

    const App = () => {
      const [_, setState] = useState(0);

      const onClickButton = () => setState((prev) => prev + 1);

      useDidMount(mockCallback);

      return (
        <div>
          <button type="button" onClick={onClickButton}>
            {BUTTON_TEXT}
          </button>
        </div>
      );
    };

    afterEach(() => {
      vi.clearAllMocks();
      cleanup();
    });

    test('mockCallback이 실행되어야 한다', () => {
      render(<App />);
      expect(mockCallback).toBeCalledTimes(1);
    });

    test('mockCallback은 상태가 변해도 1번만 실행되어야 한다', () => {
      render(<App />);
      expect(mockCallback).toBeCalledTimes(1);

      const button = screen.getByText(BUTTON_TEXT);
      fireEvent.click(button);
      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
