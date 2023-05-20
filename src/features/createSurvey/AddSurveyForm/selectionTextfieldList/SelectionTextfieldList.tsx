import { useState } from 'react';
import { css } from '@emotion/react';

import SelectionTextfield from '~/features/createSurvey/AddSurveyForm/selectionTextfieldList/SelectionTextfield';

const SelectTextFieldList = () => {
  const [inputs, setInputs] = useState(['', '', '']);
  const [focusInput, setFocusInput] = useState<number | null>(null);

  const onInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;

    if (index === inputs.length - 1) {
      setInputs([...newInputs, '']);
      setFocusInput(inputs.length - 1);

      return;
    }

    if (index === inputs.length - 2 && e.target.value === '') {
      setInputs(newInputs.slice(0, -1));

      return;
    }

    setInputs(newInputs);
  };

  return (
    <div css={containerCss}>
      {inputs.map((input, index) => (
        <SelectionTextfield
          key={index}
          isBasic={index < inputs.length - 1}
          value={input}
          onChange={(e) => onInputChange(index)(e)}
          onFocus={() => setFocusInput(index)}
          onBlur={() => setFocusInput(null)}
          isFocused={focusInput === index}
        />
      ))}
    </div>
  );
};

export default SelectTextFieldList;

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
