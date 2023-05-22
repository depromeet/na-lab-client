import { type Meta } from '@storybook/react';

import CircleButton, { ArrowCircleButton, XCircleButton } from './CircleButton';

const meta: Meta<typeof CircleButton> = {
  title: 'CircleButton',
  component: CircleButton,
};

export default meta;

export function Default() {
  return (
    <>
      <CircleButton>foo</CircleButton>
      <ArrowCircleButton />
      <XCircleButton />
    </>
  );
}
