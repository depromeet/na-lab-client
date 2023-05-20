import { useState } from 'react';
import { css } from '@emotion/react';

import SelectionTextfield from '~/features/createSurvey/AddSurveyForm/selectionTextfieldList/SelectionTextfield';

interface Props {
  basicCount: number;
}

const SelectTextFieldList = ({ basicCount }: Props) => {
  const [inputs, setInputs] = useState(new Array(basicCount + 1).fill(''));
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
          value={input}
          onChange={(e) => onInputChange(index)(e)}
          onFocus={() => setFocusInput(index)}
          onBlur={() => setFocusInput(null)}
          isFocused={focusInput === index}
          isLast={index === inputs.length - 1}
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
