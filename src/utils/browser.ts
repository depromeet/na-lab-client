// 사용 방법
// detectMobileDevice(window.navigator.userAgent)
export const detectMobileDevice = (): boolean => {
  if (!window) return false;

  const agent = window.navigator.userAgent;
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return mobileRegex.some((mobile) => agent.match(mobile));
};

export const getBrowser = () => {
  if (!window) return null;

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

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('edg')) {
    return 'Edge';
  }

  if (userAgent.includes('trident') || userAgent.includes('msie')) {
    return 'Internet Explorer';
  }

  return browsers.find((browser) => userAgent.includes(browser.toLowerCase())) || 'Other';
};
