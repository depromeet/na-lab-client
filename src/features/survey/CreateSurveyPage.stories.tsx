import { type Meta } from '@storybook/react';

import CreateSurveyPage from '~/pages/survey/create.page';

const meta: Meta<typeof CreateSurveyPage> = {
  title: 'pages/survey/CreateSurveyPage',
  component: CreateSurveyPage,
};

export default meta;

export function Default() {
  return <CreateSurveyPage />;
}
