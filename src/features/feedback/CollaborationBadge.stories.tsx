import { type Meta } from '@storybook/react';

import CollaborationBadge from './CollaborationBadge';

const meta: Meta<typeof CollaborationBadge> = {
  title: 'CollaborationBadge',
  component: CollaborationBadge,
};

export default meta;

export function Default() {
  return (
    <div>
      <CollaborationBadge />
    </div>
  );
}
