import { css, type Theme, ThemeProvider } from '@emotion/react';
import { type Meta } from '@storybook/react';

import Header from '~/components/header/Header';
import LineThreeDotsIcon from '~/components/icons/LineThreeDotsIcon';
import XIcon from '~/components/icons/XIcon';
import defaultTheme from '~/styles/theme';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
};

export default meta;

export function Default() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div css={defaultLayoutCss}>
        <Header />
      </div>
    </ThemeProvider>
  );
}

export function CancelHeader() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div css={defaultLayoutCss}>
        <Header rightButton={<XIcon />} />
      </div>
    </ThemeProvider>
  );
}

export function TitleHeader({ title = '마지막으로 저에게 조언하고 싶은 것이 있나요?' }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div css={defaultLayoutCss}>
        <Header title={title} rightButton={<LineThreeDotsIcon />} />
      </div>
    </ThemeProvider>
  );
}

const defaultLayoutCss = (theme: Theme) => css`
  width: 100%;
  max-width: ${theme.size.maxWidth};
  min-height: 100vh;
  margin: 0 auto;
`;
