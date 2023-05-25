import { type Dispatch, type SetStateAction, useState } from 'react';
import { css } from '@emotion/react';

import SelectionTextfield from '~/features/createSurvey/addSurvey/selectionTextfieldList/SelectionTextfield';

interface Props {
  inputs: string[];
  basicCount: number;

  setInputs: Dispatch<SetStateAction<string[]>>;

  isMultiChoice?: boolean;
}

const SelectTextFieldList = ({ inputs, basicCount, setInputs, isMultiChoice }: Props) => {
  const [focusInput, setFocusInput] = useState<number | null>(null);

  const onInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;

    if (index === inputs.length - 1) {
      setInputs(() => [...newInputs, '']);
      setFocusInput(inputs.length - 1);

      return;
    }

    if (index === inputs.length - 2 && e.target.value === '') {
      setInputs((prev) => prev.slice(0, -1));

      return;
    }

    setInputs(() => newInputs);
  };

  const onItemDelete = (index: number) => {
    if (inputs.length - 1 <= basicCount) {
      alert(`최소 ${basicCount}개 이상의 옵션을 입력해주세요.`);

      return;
    }
    const newInputs = [...inputs];
    newInputs.splice(index, 1);

    setInputs(newInputs);
  };

  return (
    <div css={containerCss}>
      {inputs.map((input, index) => {
        return (
          <SelectionTextfield
            key={index}
            value={input}
            onChange={(e) => onInputChange(index)(e)}
            onFocus={() => setFocusInput(index)}
            onBlur={() => setFocusInput(null)}
            onDelete={() => onItemDelete(index)}
            isFocused={focusInput === index}
            isLast={index === inputs.length - 1}
            isEssential={isMultiChoice && index < basicCount}
          />
        );
      })}
    </div>
  );
};

export default SelectTextFieldList;

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
`;
