import { type Meta } from '@storybook/react';
import { domMax, LazyMotion } from 'framer-motion';

import useBoolean from '~/hooks/common/useBoolean';

import BottomSheet from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'BottomSheet',
  component: BottomSheet,
};

export default meta;

export function Default() {
  const [isShowing, toggleShowing] = useBoolean(false);

  return (
    <LazyMotion features={domMax}>
      <button type="button" onClick={toggleShowing}>
        toggle
      </button>
      <BottomSheet onClickScrim={toggleShowing} isShowing={isShowing}>
        bottom sheet content
      </BottomSheet>
    </LazyMotion>
  );
}
