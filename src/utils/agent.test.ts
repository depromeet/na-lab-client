import { afterEach, describe, expect, test, vi } from 'vitest';

import { isAndroid, isDesktop, isIos, isMobile, isSSR } from './agent';

describe('hooks/common/useUserAgent', () => {
  const navigationUserAgentSpy = vi.spyOn(window.navigator, 'userAgent', 'get');

  const { navigator } = window;

  afterEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      configurable: true,
      writable: true,
    });
  });

  test('정의되어 있어야 한다', () => {
    expect(isAndroid).toBeDefined();
    expect(isDesktop).toBeDefined();
    expect(isIos).toBeDefined();
    expect(isMobile).toBeDefined();
    expect(isSSR).toBeDefined();
  });

  test('userAgent undefined일 시 isSSR은 true를, 이외는 false를 반환해야한다', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global.window.navigator;

    expect(isSSR()).toBeTruthy();
    expect(isIos()).not.toBeTruthy();
    expect(isMobile()).not.toBeTruthy();
    expect(isAndroid()).not.toBeTruthy();
    expect(isDesktop()).not.toBeTruthy();
  });

  test('userAgent Android 일 시 isAndroid와 isMobile은 true를, 이외는 false를 반환해야한다', () => {
    navigationUserAgentSpy.mockReturnValue('Android');

    expect(isAndroid()).toBeTruthy();
    expect(isMobile()).toBeTruthy();
    expect(isIos()).not.toBeTruthy();
    expect(isSSR()).not.toBeTruthy();
    expect(isDesktop()).not.toBeTruthy();
  });

  test('userAgent iPhone 일 시 isIos와 isMobile은 true를, 이외는 false를 반환해야한다', () => {
    navigationUserAgentSpy.mockReturnValue('iPhone');

    expect(isIos()).toBeTruthy();
    expect(isMobile()).toBeTruthy();
    expect(isAndroid()).not.toBeTruthy();
    expect(isSSR()).not.toBeTruthy();
    expect(isDesktop()).not.toBeTruthy();
  });

  test('userAgent 브라우저 값일 시 isDesktop은 true를, 이외는 false를 반환해야한다', () => {
    navigationUserAgentSpy.mockReturnValue(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0',
    );

    expect(isDesktop()).toBeTruthy();
    expect(isIos()).not.toBeTruthy();
    expect(isMobile()).not.toBeTruthy();
    expect(isAndroid()).not.toBeTruthy();
    expect(isSSR()).not.toBeTruthy();
  });
});
