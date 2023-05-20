import { ThemeProvider } from '@emotion/react';
import { type Meta } from '@storybook/react';
import { domMax, LazyMotion } from 'framer-motion';

import SelectTextFieldList from '~/features/createSurvey/AddSurveyForm/selectionTextfieldList/SelectionTextfieldList';
import defaultTheme from '~/styles/theme';

const meta: Meta<typeof SelectTextFieldList> = {
  title: 'SelectTextFieldList',
  component: SelectTextFieldList,
};

export default meta;

export function Default() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <LazyMotion features={domMax}>
        <SelectTextFieldList />
      </LazyMotion>
    </ThemeProvider>
  );
}
