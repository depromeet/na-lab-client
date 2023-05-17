import { type PropsWithChildren } from 'react';
import { ThemeProvider } from '@emotion/react';

import { pretendard } from '~/assets/fonts/pretendard';
import theme from '~/styles/theme';

/**
 * @description 스토리북에서 사용하는 Provider 컴포넌트입니다.
 */
const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={pretendard.className}>{children}</div>
    </ThemeProvider>
  );
};

export default Provider;
