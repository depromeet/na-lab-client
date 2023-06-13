import { type Meta } from '@storybook/react';

import CollaborationCounter from './CollaborationCounter';

const meta: Meta<typeof CollaborationCounter> = {
  title: 'CollaborationCounter',
  component: CollaborationCounter,
};

export default meta;

export function Default() {
  return (
    <div>
      <CollaborationCounter count={{ yes: 1, no: 1 }} />
    </div>
  );
}
