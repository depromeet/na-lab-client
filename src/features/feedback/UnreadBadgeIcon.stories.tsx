import { type Meta } from '@storybook/react';

import UnreadBadgeIcon from './UnreadBadgeIcon';

const meta: Meta<typeof UnreadBadgeIcon> = {
  title: 'UnreadBadgeIcon',
  component: UnreadBadgeIcon,
};

export default meta;

export function Default() {
  return (
    <div>
      <UnreadBadgeIcon />
    </div>
  );
}
