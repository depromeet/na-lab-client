import '@emotion/react';

import theme from '~/styles/theme';

declare module '@emotion/react' {
  type CustomTheme = typeof theme;

  export interface Theme extends CustomTheme {}
}
