import mixpanel from 'mixpanel-browser';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { event } from '~/libs/gtag';

import recordEvent from './event';

vi.mock('~/libs/gtag');
vi.mock('mixpanel-browser');

describe('utils/event', () => {
  test('recordEvent가 정의되어 있어야 한다', () => {
    expect(recordEvent).toBeDefined();
  });

  const MOCK_ACTION = 'action';

  describe('프로덕션 환경이 아닐 때', () => {
    beforeEach(() => {
      vi.resetAllMocks();
      Object.assign(process.env, { NODE_ENV: 'development' });
    });

    test('event 유틸이 실행되지 않는다', () => {
      recordEvent({ action: MOCK_ACTION });
      expect(event).not.toBeCalled();
    });

    test('mixpanel.track이 실행되지 않는다', () => {
      recordEvent({ action: MOCK_ACTION });
      expect(mixpanel.track).not.toBeCalled();
    });
  });

  describe('프로덕션 환경일 때', () => {
    const MOCK_WEB_VERSION = '1.0.0';

    beforeEach(() => {
      vi.resetAllMocks();
      Object.assign(process.env, { NODE_ENV: 'production', WEB_VERSION: MOCK_WEB_VERSION });
    });

    test('event 유틸이 실행된다', () => {
      recordEvent({ action: MOCK_ACTION });
      expect(event).toBeCalled();
    });

    test('mixpanel.track이 실행된다', () => {
      recordEvent({ action: MOCK_ACTION });
      expect(mixpanel.track).toBeCalled();
    });

    test('category로 WEB_VERSION을 사용한다', () => {
      recordEvent({ action: MOCK_ACTION });
      expect(event).toBeCalledWith({ action: MOCK_ACTION, category: MOCK_WEB_VERSION });
      expect(mixpanel.track).toBeCalledWith(MOCK_ACTION, { category: MOCK_WEB_VERSION });
    });

    test('label, value도 함께 기록된다', () => {
      const MOCK_LABEL = 'label';
      const MOCK_VALUE = 'value';

      recordEvent({ action: MOCK_ACTION, label: MOCK_LABEL, value: MOCK_VALUE });
      expect(event).toBeCalledWith({
        action: MOCK_ACTION,
        category: MOCK_WEB_VERSION,
        label: MOCK_LABEL,
        value: MOCK_VALUE,
      });
      expect(mixpanel.track).toBeCalledWith(MOCK_ACTION, {
        category: MOCK_WEB_VERSION,
        label: MOCK_LABEL,
        value: MOCK_VALUE,
      });
    });
  });
});
