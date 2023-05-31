import { type Meta } from '@storybook/react';

import ResearchMoveButton from './ResearchMoveButton';

const meta: Meta<typeof ResearchMoveButton> = {
  title: 'ResearchMoveButton',
  component: ResearchMoveButton,
};

export default meta;

export function Default() {
  return (
    <div>
      <ResearchMoveButton />
    </div>
  );
}
