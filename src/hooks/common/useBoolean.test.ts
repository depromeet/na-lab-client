import { act, renderHook } from '@testing-library/react-hooks';
import { describe, expect, test } from 'vitest';

import useBoolean from './useBoolean';

describe('hooks/common/useBoolean', () => {
  test('정의되어 있어야 한다', () => {
    expect(useBoolean).toBeDefined();
  });

  test('초기에 initialValue를 반환해야 한다', () => {
    const initialValue = false;
    const { result } = renderHook(() => useBoolean(initialValue));
    const [value] = result.current;

    expect(value).toBe(initialValue);
  });

  test('toggle 함수를 호출하면 반대의 값을 반환해야 한다', () => {
    const { result } = renderHook(() => useBoolean(false));
    const [, toggle] = result.current;

    act(() => toggle());
    const [value] = result.current;
    expect(value).toBe(true);

    act(() => toggle());
    const [nextValue] = result.current;
    expect(nextValue).toBe(false);
  });

  test('setTrue 함수를 호출하면 true를 반환해야 한다', () => {
    const { result } = renderHook(() => useBoolean(false));
    const [, , setTrue] = result.current;

    act(() => setTrue());
    const [value] = result.current;
    expect(value).toBe(true);
  });

  test('setFalse 함수를 호출하면 false를 반환해야 한다', () => {
    const { result } = renderHook(() => useBoolean(true));
    const [, , , setFalse] = result.current;

    act(() => setFalse());
    const [value] = result.current;
    expect(value).toBe(false);
  });
});
