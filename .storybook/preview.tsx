import { ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import { pretendard } from '../src/assets/fonts/pretendard';
import defaultTheme from '../src/styles/theme';
import { domMax, LazyMotion } from 'framer-motion';
import GlobalStyle from '../src/styles/GlobalStyle';

const previewDecorator = (Story) => {
  useEffect(() => {
    document.body.className = pretendard.className;
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <LazyMotion features={domMax}>
        <div className={pretendard.className} style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
          <Story />
        </div>
      </LazyMotion>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [(Story) => previewDecorator(Story)],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
