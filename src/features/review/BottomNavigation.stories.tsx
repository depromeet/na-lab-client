import { type Meta } from '@storybook/react';

import useInput from '~/hooks/common/useInput';

import BottomNavigation from './BottomNavigation';

const meta: Meta = {
  title: 'Review Bottom Navigation',
  component: BottomNavigation,
};

export default meta;

export const Default = () => {
  const [value, onChange, reset] = useInput();

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />

      <BottomNavigation onBackClick={reset} onNextClick={reset} isNextDisabled={value.length === 0} />
    </div>
  );
};
