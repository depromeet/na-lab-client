import mockRouter from 'next-router-mock';
import { renderHook } from '@testing-library/react';
import { cleanup } from '@testing-library/react-hooks';
import { afterEach, describe, expect, test, vi } from 'vitest';

import useInternalRouter from './useInternalRouter';

describe('hooks/router/useInternalRouter', () => {
  test('정의되어 있어야 한다', () => {
    expect(useInternalRouter).toBeDefined();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test('push 시 next useRouter의 push가 실행돼야 한다', () => {
    const mockPush = vi.fn();
    vi.spyOn(mockRouter, 'push').mockImplementationOnce(mockPush);
    const { result } = renderHook(() => useInternalRouter());
    const { push } = result.current;

    push('/');
    expect(mockPush).toBeCalledWith('/', undefined, undefined);
  });

  test('path 외에 as와 option도 함께 실행돼야 한다', () => {
    const mockPush = vi.fn();
    vi.spyOn(mockRouter, 'push').mockImplementationOnce(mockPush);
    const { result } = renderHook(() => useInternalRouter());
    const { push } = result.current;

    push('/', '/home', { shallow: true });
    expect(mockPush).toBeCalledWith('/', '/home', { shallow: true });
  });
});
