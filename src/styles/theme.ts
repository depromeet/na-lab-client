import colors from '~/styles/color';

const theme = {
  colors,
  size: {
    maxWidth: '480px',
  },
  transition: {
    defaultEasing: 'cubic-bezier(0.6, -0.05, 0.01, 0.99)',
  },
} as const;

export default theme;
