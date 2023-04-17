import { describe, expect, test } from 'vitest';

import { isProd } from './common';

describe('utils/common/isProd', () => {
  test('production일 경우 true를 반환해야만 한다', () => {
    const result = isProd('production');
    expect(result).toBe(true);
  });

  test('production이 아닐 경우 false를 반환해야만 한다', () => {
    const devResult = isProd('development');
    const testResult = isProd('test');

    expect(devResult).toBe(false);
    expect(testResult).toBe(false);
  });
});
