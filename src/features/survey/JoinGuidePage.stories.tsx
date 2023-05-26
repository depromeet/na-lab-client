import { type Meta } from '@storybook/react';

import JoinGuidePage from '~/pages/survey/join.page';

const meta: Meta<typeof JoinGuidePage> = {
  title: 'pages/survey/JoinGuidePage',
  component: JoinGuidePage,
};

export default meta;

export function Default() {
  return <JoinGuidePage />;
}
