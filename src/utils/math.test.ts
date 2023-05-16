import { describe, expect, test } from 'vitest';

import { clamp } from './math';

describe('utils/math', () => {
  describe('clamp', () => {
    test('value보다 max가 작으면 max를 반환한다', () => {
      expect(clamp(10, 0, 5)).toBe(5);
    });

    test('value보다 min이 크면 min을 반환한다', () => {
      expect(clamp(-10, 0, 5)).toBe(0);
    });

    test('value가 min과 max 사이에 있으면 value를 반환한다', () => {
      expect(clamp(3, 0, 5)).toBe(3);
    });
  });
});
