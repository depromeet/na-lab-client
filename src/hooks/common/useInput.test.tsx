import { cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

import useInput from './useInput';

describe('hooks/common/useInput', () => {
  test('정의되어 있어야 한다', () => {
    expect(useInput).toBeDefined();
  });

  test('value는 string type이어야 한다', () => {
    const { result } = renderHook(() => useInput());
    const [value] = result.current;

    expect(typeof value).toBe('string');
  });

  describe('value', () => {
    test('value의 기본값은 ``이어야 한다', () => {
      const { result } = renderHook(() => useInput());
      const [value] = result.current;

      expect(value).toBe('');
    });

    test('value의 기본값이 적용되어야 한다', () => {
      const initialValue = 'initial value';
      const { result } = renderHook(() => useInput(initialValue));
      const [value] = result.current;

      expect(value).toBe(initialValue);
    });
  });

  describe('onChange, resetValue', () => {
    const INPUT_TEST_ID = 'input';
    const RESET_BUTTON_TEXT = 'reset';

    const App = () => {
      const [value, onChange, resetValue] = useInput();

      return (
        <div>
          <input value={value} onChange={onChange} data-testid={INPUT_TEST_ID} />
          <button type="button" onClick={resetValue}>
            {RESET_BUTTON_TEXT}
          </button>
        </div>
      );
    };

    afterEach(cleanup);

    test('onChange 시 value가 변경되어야 한다', () => {
      render(<App />);
      const input = screen.getByTestId(INPUT_TEST_ID) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test' } });
      expect(input.value).toBe('test');
    });

    test('resetValue 시 value가 초기화되어야 한다', () => {
      render(<App />);
      const input = screen.getByTestId(INPUT_TEST_ID) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test' } });

      const resetButton = screen.getByText(RESET_BUTTON_TEXT);
      fireEvent.click(resetButton);

      expect(input.value).toBe('');
    });
  });
});
