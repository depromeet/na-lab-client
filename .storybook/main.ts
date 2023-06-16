import path from 'path';

import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    path.dirname(require.resolve(path.join('@storybook/addon-links', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-essentials', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-interactions', 'package.json'))),
    path.dirname(require.resolve(path.join('@storybook/addon-storysource', 'package.json'))),
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    },
  },
  docs: {
    autodocs: 'tag',
  },
  babel: async (options) => {
    options.presets!.push('@emotion/babel-preset-css-prop');
    options.presets!.push(['@babel/preset-typescript', { allowDeclareFields: true }]);

    return options;
  },
  staticDirs: [
    {
      from: '../src/assets/fonts',
      to: 'src/assets/fonts',
    },
  ],
};

export default config;
