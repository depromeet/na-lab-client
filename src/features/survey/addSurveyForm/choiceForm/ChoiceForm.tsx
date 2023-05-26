import { type Dispatch, type SetStateAction } from 'react';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

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

    if (maxSelect >= inputs.length) {
      setInputs((prev) => [...prev, '']);
    }
    if (maxSelect === CHOICE_CASE_MAX_SELECT_COUNT) {
      // 색상 구분된 선택지가 하나로 줄어들고, - 0.5초 후 복수선택 가능 선택 해제,
      // TODO : ‘복수 선택이 해제되었어요’ 토스트 2초간 띄우기
      const timer = setTimeout(() => {
        console.info('복수 선택이 해제되었어요');
        onClick();
      }, 500);

      return () => clearTimeout(timer);
    }
    if (maxSelect > MULTI_SELECT_MAX_COUNT) {
      // TODO : 최대 19 초과시: 토스트 알림 2초간 띄우기
      alert('최대 선택 개수를 초과했어요');
      setMaxSelect(MULTI_SELECT_MAX_COUNT);
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
