import { useCallback, useState } from 'react';

/**
 * boolean을 쉽게 다룰 수 있는 hook 입니다
 *
 * @param initialValue - 기본 boolean 값
 * @returns [boolean state, toggle func, set true func, set false func]
 */
const useBoolean = (initialValue: boolean): readonly [boolean, VoidFunction, VoidFunction, VoidFunction] => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setTrue, setFalse];
};

export default useBoolean;
