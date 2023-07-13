// 사용 방법
// detectMobileDevice(window.navigator.userAgent)
export const detectMobileDevice = (agent: string): boolean => {
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return mobileRegex.some((mobile) => agent.match(mobile));
};
