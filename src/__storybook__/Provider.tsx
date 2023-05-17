import { type PropsWithChildren } from 'react';
import { css, type Theme, ThemeProvider } from '@emotion/react';

import { pretendard } from '~/assets/fonts/pretendard';
import defaultTheme from '~/styles/theme';

/**
 * @description 스토리북에서 사용하는 Provider 컴포넌트입니다.
 */
const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div css={defaultLayoutCss} className={pretendard.className}>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default Provider;

const defaultLayoutCss = (theme: Theme) => css`
  width: 100%;
  max-width: ${theme.size.maxWidth};
  margin: 0 auto;
`;
