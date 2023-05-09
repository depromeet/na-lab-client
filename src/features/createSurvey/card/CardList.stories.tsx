import { type Meta } from '@storybook/react';
import { domMax, LazyMotion } from 'framer-motion';

import CardList from '~/features/createSurvey/card/CardList';

const meta: Meta<typeof CardList> = {
  title: 'Drag and drop',
  component: CardList,
};

export default meta;

export function Default() {
  return (
    <LazyMotion features={domMax}>
      <CardList />
    </LazyMotion>
  );
}
