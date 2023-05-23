import { type Dispatch, type SetStateAction } from 'react';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

import { defaultFadeInDownVariants } from '~/constants/motions';
import Check from '~/features/createSurvey/addSurvey/choiceForm/Check';
import MaximumSelect from '~/features/createSurvey/addSurvey/choiceForm/MaximumSelect';
import SelectTextFieldList from '~/features/createSurvey/addSurvey/selectionTextfieldList/SelectionTextfieldList';
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

  // const [maxSelect, setMaxSelect] = useState(1);
  // const [inputs, setInputs] = useState(['', '']);

  useDidUpdate(() => {
    if (maxSelect >= inputs.length) {
      setInputs((prev) => [...prev, '']);
    }
  }, [maxSelect]);

  return (
    <section css={containerCss}>
      <Check isChecked={isChecked} toggleCheck={toggleCheck} label="복수선택 가능" />
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
