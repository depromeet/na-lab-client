import { BASE_URL } from '~/constants/url';

export const copyToClipBoard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const copyToClipBoardWithHost = (path: string) => {
  if (typeof window === 'undefined') {
    copyToClipBoard(`${BASE_URL}${path}`);
  } else {
    const { host } = window.location;
    copyToClipBoard(`${host}${path}`);
  }
};

export const copyToClipBoardWithHostUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return `${BASE_URL}${path}`;
  } else {
    const { host } = window.location;

    return `${host}${path}`;
  }
};
