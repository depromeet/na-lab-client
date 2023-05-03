import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import useDebounce from './useDebounce';

describe('hooks/common/useDebounce', () => {
  test('정의되어 있는가', () => {
    expect(useDebounce).toBeDefined();
  });

  test('함수를 반환하는가', () => {
    const testFn = () => {
      return;
    };
    const { result } = renderHook(() => useDebounce(testFn, 500));
    expect(typeof result.current).toBe('function');
  });

  describe('debounce', () => {
    const App = () => {
      const [val, setVal] = useState(0);

      const onDebouncedClick = useDebounce(() => {
        setVal((prev) => prev + 1);
      }, 500);

      return (
        <div>
          <span data-testid="count">{val}</span>
          <button data-testid="button" type="button" onClick={onDebouncedClick}>
            click
          </button>
        </div>
      );
    };

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(cleanup);

    test('반환된 함수를 실행하면 ms이후 실행된다', async () => {
      render(<App />);
      const Button = screen.getByTestId('button');
      const Count = screen.getByTestId('count');

      fireEvent.click(Button);
      await vi.advanceTimersByTime(500);

      expect(Count.innerHTML).toBe('1');
    });

    test('반환된 함수를 연속 실행하면 ms이후 1회로 병합되어 실행된다', async () => {
      render(<App />);
      const Button = screen.getByTestId('button');
      const Count = screen.getByTestId('count');

      for (let i = 0; i < 10; i++) {
        fireEvent.click(Button);
      }
      await vi.advanceTimersByTime(500);

      expect(Count.innerHTML).toBe('1');
    });

    test('반환된 함수를 실행 후, ms가 지나기 전에 추가로 실행하면 이전 실행에 병합된다', async () => {
      render(<App />);
      const Button = screen.getByTestId('button');
      const Count = screen.getByTestId('count');

      fireEvent.click(Button);
      await vi.advanceTimersByTime(300);

      fireEvent.click(Button);
      await vi.advanceTimersByTime(500);

      expect(Count.innerHTML).toBe('1');
    });

    test('반환된 함수의 실행 간격이 ms를 초과하면 별도의 실행으로 분리된다', async () => {
      render(<App />);
      const Button = screen.getByTestId('button');
      const Count = screen.getByTestId('count');

      fireEvent.click(Button);
      await vi.advanceTimersByTime(500);

      fireEvent.click(Button);
      await vi.advanceTimersByTime(500);

      expect(Count.innerHTML).toBe('2');
    });
  });
});
