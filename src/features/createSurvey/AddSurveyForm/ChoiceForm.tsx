import { css, type Theme } from '@emotion/react';

import { SmallCheckIcon } from '~/components/icons/CheckIcon';
import useBoolean from '~/hooks/common/useBoolean';

const ChoiceForm = () => {
  const [isChecked, toggleCheck] = useBoolean(false);

  return (
    <div>
      <button type="button" css={(theme) => checkBoxCss(theme, isChecked)} onClick={toggleCheck}>
        {isChecked && <SmallCheckIcon />}
      </button>
    </div>
  );
};

export default ChoiceForm;

const checkBoxCss = (theme: Theme, isSelected: boolean) => css`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;

  background-color: ${theme.colors.gray_50};
  border: 1px solid ${theme.colors.gray_200};
  border-radius: 2px;

  transition: 0.2 ease-in-out;

  ${isSelected &&
  `
    background-color: ${theme.colors.primary_200};
    border: 1px solid ${theme.colors.primary_200};
  `}
`;
