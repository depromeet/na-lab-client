import { type Dispatch, type SetStateAction } from 'react';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

import WarningIcon from '~/components/icons/WarningIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { defaultFadeInDownVariants } from '~/constants/motions';
import Check from '~/features/survey/addSurveyForm/choiceForm/Check';
import MaximumSelect from '~/features/survey/addSurveyForm/choiceForm/MaximumSelect';
import SelectTextFieldList from '~/features/survey/addSurveyForm/selectionTextfieldList/SelectionTextfieldList';
import {
  CHOICE_CASE_MAX_SELECT_COUNT,
  DEFAULT_MAX_SELECT_COUNT,
  MULTI_SELECT_MAX_COUNT,
} from '~/features/survey/constants';
import useBoolean from '~/hooks/common/useBoolean';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';

interface Props {
  maxSelect: number;
  setMaxSelect: Dispatch<SetStateAction<number>>;
  inputs: string[];
  setInputs: Dispatch<SetStateAction<string[]>>;
}

const ChoiceForm = ({ maxSelect, setMaxSelect, inputs, setInputs }: Props) => {
  const { fireToast } = useToast();
  const [isChecked, toggleCheck] = useBoolean(false);

  const onClick = () => {
    if (isChecked === true) {
      setMaxSelect(CHOICE_CASE_MAX_SELECT_COUNT);
    } else {
      setMaxSelect(DEFAULT_MAX_SELECT_COUNT);
    }
    toggleCheck();
  };

  useDidUpdate(() => {
    if (isChecked === false) return;

    if (maxSelect > MULTI_SELECT_MAX_COUNT) {
      fireToast({
        content: (
          <>
            <WarningIcon />
            <Toast.Text>최대 선택 개수를 초과했어요</Toast.Text>
          </>
        ),
        higherThanCTA: true,
      });

      setMaxSelect(MULTI_SELECT_MAX_COUNT);

      return;
    }

    const isIncrease = maxSelect === MULTI_SELECT_MAX_COUNT ? false : maxSelect >= inputs.length - 1;
    if (isIncrease) {
      setInputs((prev) => [...prev, '']);
    }

    if (maxSelect === CHOICE_CASE_MAX_SELECT_COUNT) {
      const timer = setTimeout(() => {
        fireToast({
          content: '복수 선택이 해제되었어요',
          higherThanCTA: true,
        });

        onClick();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [maxSelect]);

  return (
    <section css={containerCss}>
      <Check isChecked={isChecked} toggleCheck={onClick} label="복수선택 가능" />
      {isChecked && (
        <m.div variants={defaultFadeInDownVariants} initial="initial" animate="animate" exit="exit">
          <MaximumSelect value={maxSelect} setValue={setMaxSelect} />
        </m.div>
      )}
      <SelectTextFieldList inputs={inputs} basicCount={maxSelect} setInputs={setInputs} isMultiChoice={isChecked} />
    </section>
  );
};

export default ChoiceForm;

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;

  width: 100%;
`;
