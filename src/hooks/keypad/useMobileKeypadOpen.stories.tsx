import { type Meta } from '@storybook/react';

import useMobileKeypadOpen from './useMobileKeypadOpen';

const meta: Meta<typeof useMobileKeypadOpen> = { title: 'useMobileKeypadOpen', component: Default };

export default meta;

export function Default() {
  const { isOpen, onFocus, onBlur } = useMobileKeypadOpen();

  return (
    <div>
      <p>{isOpen ? 'mobile keypad open' : 'closed'}</p>

      <input onFocus={onFocus} onBlur={onBlur} />
    </div>
  );
}
