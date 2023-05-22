import { css, type Theme } from '@emotion/react';

import { SmallCheckIcon } from '~/components/icons/CheckIcon';
import useBoolean from '~/hooks/common/useBoolean';
import { BODY_2_BOLD } from '~/styles/typo';

const ChoiceForm = () => {
  const [isChecked, toggleCheck] = useBoolean(false);

  return (
    <div>
      <div css={checkBoxWrapperCss}>
        <button id="multi-check" type="button" css={(theme) => checkBoxCss(theme, isChecked)} onClick={toggleCheck}>
          {isChecked && <SmallCheckIcon />}
        </button>
        <label htmlFor="multi-check" css={checkboxLabelCss}>
          복수선택 가능
        </label>
      </div>
    </div>
  );
};

export default ChoiceForm;

const checkBoxWrapperCss = css`
  display: flex;
  gap: 5px;
  align-items: center;
`;

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

const checkboxLabelCss = ({ colors }: Theme) => css`
  ${BODY_2_BOLD}

  user-select: none;
  color: ${colors.gray_400};
`;
