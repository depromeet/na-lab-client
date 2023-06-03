import colors from '~/styles/color';

const zIndex = {
  belowDefault: -1,
  default: 0,
  aboveDefault: 1,
  belowFixed: 99,
  fixed: 100,
  aboveFixed: 101,
  backdrop: 900,
  modal: 1000,
  toast: 2000,
  above: (n: number) => n + 1,
  below: (n: number) => n - 1,
} as const;

const theme = {
  colors,
  size: {
    maxWidth: '480px',
  },
  transition: {
    defaultEasing: 'cubic-bezier(0.6, -0.05, 0.01, 0.99)',
  },
  zIndex,
} as const;

export default theme;
