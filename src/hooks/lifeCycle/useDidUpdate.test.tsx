import { useState } from 'react';
import { cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import useDidUpdate from './useDidUpdate';

describe('hooks/lifeCycle/useDidUpdate', () => {
  test('정의되어 있어야 한다', () => {
    expect(useDidUpdate).toBeDefined();
  });

  test('첫 호출 시 effectCallback이 실행되면 안된다', () => {
    const mockCallback = vi.fn();
    renderHook(() => useDidUpdate(mockCallback, []));
    expect(mockCallback).not.toBeCalled();
  });

  describe('useDidUpdate Component', () => {
    const mockCallback = vi.fn();
    const BUTTON_TEXT = 'button';

    const App = () => {
      const [state, setState] = useState(0);

      const onClickButton = () => setState((prev) => prev + 1);

      useDidUpdate(mockCallback, [state]);

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

    test('마운트 시 effectCallback이 실행되면 안된다', () => {
      render(<App />);
      expect(mockCallback).not.toBeCalled();
    });

    test('dependency list가 변경되면 effectCallback이 실행된다', () => {
      render(<App />);
      expect(mockCallback).not.toBeCalled();

      const button = screen.getByText(BUTTON_TEXT);
      fireEvent.click(button);
      expect(mockCallback).toBeCalledTimes(1);

      fireEvent.click(button);
      expect(mockCallback).toBeCalledTimes(2);
    });
  });
});
