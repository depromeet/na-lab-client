const getNavigatorUserAgent = () => {
  return typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
};

export const isAndroid = () => {
  const userAgent = getNavigatorUserAgent();

  return Boolean(userAgent.match(/Android/i));
};

export const isIos = () => {
  const userAgent = getNavigatorUserAgent();

  return Boolean(userAgent.match(/iPhone|iPad|iPod/i));
};

export const isMobile = () => {
  return Boolean(isAndroid() || isIos());
};

export const isSSR = () => {
  const userAgent = getNavigatorUserAgent();

  return Boolean(userAgent.match(/SSR/i));
};

export const isDesktop = () => {
  return Boolean(!isMobile() && !isSSR());
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

  if (userAgent.includes('CriOS')) {
    return 'Chrome';
  }

  return browsers.find((browser) => userAgent.includes(browser.toLowerCase())) || 'Other';
};
