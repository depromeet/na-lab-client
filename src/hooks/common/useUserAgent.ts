interface IUseUserAgent {
  isAndroid: () => boolean;
  isIos: () => boolean;
  isMobile: () => boolean;
  isSSR: () => boolean;
  isDesktop: () => boolean;
}

export const getMobileDetect = (userAgent: string): IUseUserAgent => {
  const isAndroid = (): boolean => Boolean(userAgent.match(/Android/i));
  const isIos = (): boolean => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isMobile = (): boolean => Boolean(isAndroid() || isIos());
  const isSSR = (): boolean => Boolean(userAgent.match(/SSR/i));
  const isDesktop = (): boolean => Boolean(!isMobile() && !isSSR());

  return {
    isAndroid,
    isIos,
    isMobile,
    isSSR,
    isDesktop,
  };
};

export function useUserAgent(): IUseUserAgent {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  return getMobileDetect(userAgent);
}
