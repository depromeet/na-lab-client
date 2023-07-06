import { renderHook } from '@testing-library/react-hooks';
import { describe, expect, test } from 'vitest';

import useIsMounted from './useIsMounted';

describe('hooks/lifeCycle/useIsMounted', () => {
  test('정의되어 있는가', () => {
    expect(useIsMounted).toBeDefined();
  });

  test('mount되면 true를 반환한다.', () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current).toBe(true);
  });
});
