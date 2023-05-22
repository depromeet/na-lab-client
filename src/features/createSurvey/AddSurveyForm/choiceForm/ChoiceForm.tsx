import Check from '~/features/createSurvey/addSurveyForm/choiceForm/Check';
import useBoolean from '~/hooks/common/useBoolean';

const ChoiceForm = () => {
  const [isChecked, toggleCheck] = useBoolean(false);

  return (
    <div>
      <Check isChecked={isChecked} toggleCheck={toggleCheck} label="복수선택 가능" />
    </div>
  );
};

export default ChoiceForm;
