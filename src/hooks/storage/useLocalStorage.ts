import { useState } from 'react';

/**
 * @description 페이지 새로 고침을 통해 상태가 유지되도록 로컬 저장소에 동기화합니다.
 *
 * @param key 로컬 저장소에 저장될 키
 * @param initialValue 초기 값
 * @returns [storedValue, setValue] - 로컬 저장소에 저장된 값, 저장 함수
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;

        if (nextValue === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
