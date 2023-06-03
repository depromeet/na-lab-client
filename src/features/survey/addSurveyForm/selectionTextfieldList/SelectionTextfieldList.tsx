import { type Dispatch, type SetStateAction, useState } from 'react';
import { css } from '@emotion/react';

import WarningIcon from '~/components/icons/WarningIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import SelectionTextfield from '~/features/survey/addSurveyForm/selectionTextfieldList/SelectionTextfield';
import { OPTION_MAX_COUNT, OPTION_MAX_LENGTH, OPTION_MIN_COUNT } from '~/features/survey/constants';

interface Props {
  inputs: string[];
  basicCount: number;

  setInputs: Dispatch<SetStateAction<string[]>>;

  isMultiChoice?: boolean;
}

const SelectTextFieldList = ({ inputs, basicCount, setInputs, isMultiChoice }: Props) => {
  const { fireToast } = useToast();
  const [focusInput, setFocusInput] = useState<number | null>(null);

  const onInputChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > OPTION_MAX_LENGTH) {
      fireToast({
        content: (
          <>
            <WarningIcon />
            <Toast.Text>글자수를 초과했어요</Toast.Text>
          </>
        ),
        higherThanCTA: true,
      });

      return;
    }

    const newInputs = [...inputs];
    newInputs[index] = e.target.value;

    if (index === inputs.length - 1) {
      setInputs(() => [...newInputs, '']);
      setFocusInput(inputs.length - 1);

      return;
    }

    if (index === inputs.length - 2 && index >= OPTION_MIN_COUNT && e.target.value === '') {
      setInputs((prev) => [...prev.slice(0, -2), '']);

      return;
    }

    setInputs(() => newInputs);
  };

  const onItemDelete = (index: number) => {
    if (inputs.length - 1 <= OPTION_MIN_COUNT) {
      fireToast({ content: `최소 ${OPTION_MIN_COUNT}개 이상의 옵션을 입력해주세요.`, higherThanCTA: true });

      return;
    }

    if (inputs.length - 1 <= basicCount) {
      fireToast({ content: `최소 ${basicCount}개 이상의 옵션을 입력해주세요.`, higherThanCTA: true });

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
            isLast={inputs.length < OPTION_MAX_COUNT && index === inputs.length - 1}
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
