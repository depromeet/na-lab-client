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
