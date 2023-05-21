import { useState } from 'react';
import { type Meta } from '@storybook/react';

import SelectTextFieldList from '~/features/createSurvey/AddSurveyForm/selectionTextfieldList/SelectionTextfieldList';

const meta: Meta<typeof SelectTextFieldList> = {
  title: 'SelectTextFieldList',
  component: SelectTextFieldList,
};

export default meta;

const basicCount = 3;

export function Default() {
  const [inputs, setInputs] = useState(new Array(basicCount + 1).fill(''));

  return <SelectTextFieldList basicCount={2} inputs={inputs} setInputs={setInputs} />;
}

export const MultiChoice = () => {
  const [inputs, setInputs] = useState(new Array(basicCount + 1).fill(''));

  return <SelectTextFieldList basicCount={basicCount} inputs={inputs} setInputs={setInputs} isMultiChoice />;
};
