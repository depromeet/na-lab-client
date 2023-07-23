/**
 * @description 모바일 디바이스 환경인지 감지합니다.
 * @example
 * ```ts
 * detectMobileDevice(window.navigator.userAgent)
 * ```
 * @returns boolean
 */

export const detectMobileDevice = (): boolean => {
  if (!window) return false;

  const agent = window.navigator.userAgent;
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return mobileRegex.some((mobile) => agent.match(mobile));
};

const browsers = [
  'Chrome',
  'Opera',
  'WebTV',
  'Whale',
  'Beonex',
  'Chimera',
  'NetPositive',
  'Phoenix',
  'Firefox',
  'Safari',
  'SkipStone',
  'Netscape',
  'Mozilla',
];

/**
 * @description 브라우저 종류를 알아내는 함수입니다.
 * @returns string - 브라우저 이름 or 'Other'
 */

export const getBrowser = () => {
  if (!window) return null;

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('edg')) {
    return 'Edge';
  }

  if (userAgent.includes('trident') || userAgent.includes('msie')) {
    return 'Internet Explorer';
  }

  return browsers.find((browser) => userAgent.includes(browser.toLowerCase())) || 'Other';
};
