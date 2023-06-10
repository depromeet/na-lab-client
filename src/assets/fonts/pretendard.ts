import localFont from 'next/font/local';

// TODO: 파이어폭스, 사파리 환경에서 동작하지 않아서 사용하지 않는 중 -> 대처 필요
export const pretendard = localFont({
  src: './Pretendard.woff2',
  display: 'swap',
  preload: true,
  fallback: [
    'Pretendard Variable',
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
});
