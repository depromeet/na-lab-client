import { ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import React from 'react';
import { pretendard } from "../src/assets/fonts/pretendard"
import defaultTheme from "../src/styles/theme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <div className={pretendard.className} style={{ width: "100%", maxWidth: "480px", margin: "0 auto"}}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
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
