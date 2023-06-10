import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { type Meta } from '@storybook/react';
import { domMax, LazyMotion } from 'framer-motion';

import defaultTheme from '~/styles/theme';

import TextToggle, { type TextToggleItem } from './TextToggle';

const meta: Meta<typeof TextToggle> = {
  title: 'TextToggle',
  component: TextToggle,
};

export default meta;

const defaultList: [TextToggleItem, TextToggleItem] = [
  {
    type: 'CHOICE',
    label: '객관식',
  },
  {
    type: 'SHORT_ANSWER',
    label: '주관식',
  },
];

export function Default() {
  const [selectItem, setSelectItem] = useState('CHOICE');

  const onItemClick = (type: string) => {
    setSelectItem(type);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <LazyMotion features={domMax}>
        <TextToggle list={defaultList} selectItem={selectItem} onItemClick={onItemClick} />
      </LazyMotion>
    </ThemeProvider>
  );
}
