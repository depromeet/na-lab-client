import { type ChangeEventHandler, useCallback, useState } from 'react';

type Return = readonly [string, ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, VoidFunction];

/**
 * string input을 쉽게 다룰 수 있는 hook 입니다
 *
 * @param initialValue - 기본 string 값
 * @returns [string state, on change handler, state reset func]
 */
const useInput = (initialValue = ''): Return => {
  const [state, setState] = useState(initialValue);

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(({ target }) => {
    const { value } = target;
    setState(value);
  }, []);

  const resetValue = useCallback(() => {
    setState(initialValue);
  }, [initialValue]);

  return [state, onChange, resetValue];
};

export default useInput;
