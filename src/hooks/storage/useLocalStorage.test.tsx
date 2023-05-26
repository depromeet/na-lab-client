import { act, renderHook } from '@testing-library/react-hooks';
import { describe, expect, test, vitest } from 'vitest';

import useLocalStorage from '~/hooks/storage/useLocalStorage';

const STORAGE_KEY = 'storage_key';

describe('hooks/storage/useLocalStorage', () => {
  test('초기값 리턴 확인', () => {
    const initialState = { a: 1, b: 2 };
    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY, initialState));

    expect(result.current[0]).toEqual(initialState);
  });

  test('로컬스토리지에 초기값이 정상적으로 저장되어있는지 확인', () => {
    const initialState = { a: 1, b: 2 };
    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY, { a: 1, b: 2 }));

    act(() => {
      result.current[1](initialState);
    });

    expect(localStorage.getItem(STORAGE_KEY)).toEqual(JSON.stringify(initialState));
  });

  test('로컬스토리지에 새로운 값으로 재설정', () => {
    const initialState = { a: 1, b: 2 };
    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY, initialState));
    const newValue = { a: 2, b: 5 };
    act(() => {
      result.current[1](newValue);
    });
    expect(result.current[0]).toEqual(newValue);
    expect(localStorage.getItem(STORAGE_KEY)).toEqual(JSON.stringify(newValue));
  });

  test('로컬스토리지의 setItem이 한번 호출되었는지 확인', () => {
    // do not prepare the initial state on every render except the first
    const spyStorage = vitest.spyOn(Storage.prototype, 'setItem');

    const initialState = { a: 1, b: 2 };
    const { result } = renderHook(() => useLocalStorage(STORAGE_KEY, initialState));
    const newValue = { a: 2, b: 5 };
    act(() => {
      result.current[1](newValue);
    });
    expect(result.current[0]).toEqual(newValue);
    expect(spyStorage).toHaveBeenCalledTimes(1);
    spyStorage.mockReset();
  });
});
