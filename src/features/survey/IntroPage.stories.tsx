import { type Meta } from '@storybook/react';

import IntroPage from '~/pages/survey/intro.page';

const meta: Meta<typeof IntroPage> = {
  title: 'pages/survey/IntroPage',
  component: IntroPage,
};

export default meta;

export function Default() {
  return <IntroPage />;
}
