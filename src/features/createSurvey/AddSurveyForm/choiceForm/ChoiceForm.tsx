import { useState } from 'react';

import Check from '~/features/createSurvey/addSurveyForm/choiceForm/Check';
import MaximumSelect from '~/features/createSurvey/addSurveyForm/choiceForm/MaximumSelect';
import useBoolean from '~/hooks/common/useBoolean';

const ChoiceForm = () => {
  const [isChecked, toggleCheck] = useBoolean(false);
  const [maxSelect, setMaxSelect] = useState(1);

  return (
    <div>
      <Check isChecked={isChecked} toggleCheck={toggleCheck} label="복수선택 가능" />
      <MaximumSelect value={maxSelect} setValue={setMaxSelect} />
    </div>
  );
};

export default ChoiceForm;
