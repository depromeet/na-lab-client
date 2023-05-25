import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import useScrollLock from './useScrollLock';

describe('hooks/common/useScrollLock', () => {
  test('정의되어 있는가', () => {
    expect(useScrollLock).toBeDefined();
  });

  test('useScrollLock의 lock이 false이면 스크롤이 잠기지 않는다', () => {
    renderHook(() => useScrollLock({ lock: false }));

    expect(document.body.style.overflow).not.toBe('hidden');
  });

  test('useScrollLock의 lock이 true면 스크롤이 잠긴다', () => {
    const { unmount } = renderHook(() => useScrollLock({ lock: true }));

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).not.toBe('hidden');
  });
});
