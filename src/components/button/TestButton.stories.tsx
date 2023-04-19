import { type Meta, type StoryObj } from '@storybook/react';

import TestButton from './TestButton';

const meta: Meta<typeof TestButton> = {
  title: 'TestButton',
  component: TestButton,
};

export default meta;

export const Primary: StoryObj<typeof TestButton> = {
  render: () => <TestButton />,
};
