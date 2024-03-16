import { type Meta } from '@storybook/react';

import BottomBar from './BottomBar';

const meta: Meta<typeof BottomBar> = {
  title: 'BottomBar',
  component: BottomBar,
};

export default meta;

export function Default() {
  return (
    <div>
      <BottomBar />
    </div>
  );
}
