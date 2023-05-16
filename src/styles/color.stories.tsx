import { css, ThemeProvider } from '@emotion/react';
import { type Meta } from '@storybook/react';

import defaultTheme from '~/styles/theme';

const meta: Meta<typeof Default> = {
  title: 'Colors',
  component: Default,
};

export default meta;

export function Default() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div css={HeadingCss}>Button</div>
      <div css={FlexBoxCss}>
        <div css={[(theme) => ({ backgroundColor: theme.colors.primary_200 }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.primary_100 }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.primary_50 }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.primary_300 }), BoxCss]} />
      </div>
      <div css={FlexBoxCss}>
        <span>$primary.200 (main-color)</span>
        <span>$primary.100 (button-disabled)</span>
        <span>$primary.50 (background)</span>
        <span>$primary.300 (button-hover)</span>
      </div>
      <div css={HeadingCss}>Text & Icon</div>
      <div css={FlexBoxCss}>
        <div css={[(theme) => ({ backgroundColor: theme.colors.secondary_200 }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.secondary_100 }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.secondary_300 }), BoxCss]} />
      </div>
      <div css={FlexBoxCss}>
        <span>$secondary.200</span>
        <span>$secondary.100 (button-disabled)</span>
        <span>$secondary.300 (button-hover)</span>
      </div>
      <div css={HeadingCss}>Background</div>
      <div css={FlexBoxCss}>
        <div css={[(theme) => ({ backgroundColor: theme.colors.black }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.gray_500 }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.gray_400 }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.gray_300 }), BoxCss]} />
      </div>
      <div css={FlexBoxCss}>
        <span>$black (text-primary)</span>
        <span>$gray.500 (text-secondary)</span>
        <span>$gray.400 (text-tertiary)</span>
        <span>$gray.300 (text-disabled)</span>
      </div>
      <div css={FlexBoxCss}>
        <div css={[(theme) => ({ backgroundColor: theme.colors.white }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.gray_50 }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.gray_100 }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.gray_200 }), BoxCss]} />
      </div>
      <div css={FlexBoxCss}>
        <span>$white (background-primary)</span>
        <span>$gray.50 (background-secondary)</span>
        <span>$gray.100 (background-hover)</span>
        <span>$gray.200 (background-tertiary)</span>
      </div>
      <div css={HeadingCss}>System Color</div>
      <div css={FlexBoxCss}>
        <div css={[(theme) => ({ backgroundColor: theme.colors.red }), BoxCss]} />
      </div>
      <div css={FlexBoxCss}>
        <span>$system-red</span>
      </div>
      <div css={HeadingCss}>Sub Color</div>
      <div css={FlexBoxCss}>
        <div css={[(theme) => ({ backgroundColor: theme.colors.pink }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.purple }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.yellowgreen }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.bluegreen }), BoxCss]} />
        <div css={[(theme) => ({ backgroundColor: theme.colors.skyblue }), BoxCss]} />
      </div>
      <div css={FlexBoxCss}>
        <span>$sub-pink</span>
        <span>$sub-purple</span>
        <span>$secondary-yellowgreen</span>
        <span>$secondary-bluegreen</span>
        <span>$secondary-skyblue</span>
      </div>
    </ThemeProvider>
  );
}

const headingCss = css`
  margin: 30px 0 10px;
  font-size: 30px;
  font-weight: 700;
  color: #2c433c;
`;

const FlexBoxCss = css`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  & > span {
    width: 200px;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
  }
`;

const BoxCss = css`
  width: 200px;
  height: 100px;
  border: 2px solid rgb(10 10 12 / 8%);
  border-radius: 15.2085px;
`;
