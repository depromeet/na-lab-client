import { type Meta, type StoryObj } from '@storybook/react';

import TestButton from './TestButton';

const meta: Meta<typeof TestButton> = {
  title: 'TestButton',
  component: TestButton,
};

export default meta;

type Story = StoryObj<typeof TestButton>;

export const Primary: Story = {
  render: () => <TestButton />,
};
