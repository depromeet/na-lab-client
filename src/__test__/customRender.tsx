import { type PropsWithChildren, type ReactElement } from 'react';
import { ThemeProvider } from '@emotion/react';
import { render, type RenderOptions } from '@testing-library/react';

import theme from '~/styles/theme';

import ReactQueryWrapper from './ReactQueryWrapper';

const RenderWithProviders = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryWrapper>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ReactQueryWrapper>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: RenderWithProviders, ...options });
};

export default customRender;
