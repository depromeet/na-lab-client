import { type ChangeEvent, useState } from 'react';
import { css, type Theme } from '@emotion/react';

import Button from '~/components/button/Button';
import { XCircleButton } from '~/components/button/CircleButton';
import WarningIcon from '~/components/icons/WarningIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import ChoiceForm from '~/features/survey/addSurveyForm/choiceForm/ChoiceForm';
import TextToggle from '~/features/survey/addSurveyForm/TextToggle';
import { DEFAULT_OPTION_LENGTH, QUESTION_MAX_LENGTH } from '~/features/survey/constants';
import { fixedBottomCss } from '~/features/survey/styles';
import {
  type ChoiceQuestionItem,
  type QuestionItem,
  type QuestionType,
  type ShortQuestionItem,
} from '~/features/survey/types';
import { HEAD_1, HEAD_2_BOLD } from '~/styles/typo';

const TOGGLE_LIST: {
  type: QuestionType;
  label: string;
}[] = [
  {
    type: 'choice',
    label: '객관식',
  },
  {
    type: 'short',
    label: '주관식',
  },
];

interface Props {
  onClose: () => void;
  onAction: (question: QuestionItem) => void;
}

const AddSurveyForm = ({ onClose, onAction }: Props) => {
  const { fireToast } = useToast();

  const [selectToggleTab, setSelectToggleTab] = useState<QuestionType>(TOGGLE_LIST[0].type);
  const [questionInput, setQuestionInput] = useState('');

  const [maxSelect, setMaxSelect] = useState(1);
  const [inputs, setInputs] = useState(new Array(DEFAULT_OPTION_LENGTH + 1).fill(''));

  const isChoice = selectToggleTab === 'choice';
  const optionInputs = isChoice ? inputs.slice(0, -1) : inputs; // 다른 옵션 추가 제외

  const isAllInputFilled = !isChoice || optionInputs.every((input) => removeSpaceAndEnter(input) !== '');
  const isButtonDisabled = !isAllInputFilled || removeSpaceAndEnter(questionInput) === '';

  const onQuestionInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > QUESTION_MAX_LENGTH) {
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
    setQuestionInput(e.target.value);
  };

  const onComplete = () => {
    if (isChoice) {
      const choices = optionInputs.map((input, idx) => ({
        content: input,
        order: idx + 1,
      }));

      const data: ChoiceQuestionItem = {
        type: 'choice',
        form_type: 'custom',
        title: questionInput,
        choices: choices,
        max_selectable_count: maxSelect,
      };

      onAction(data);
    } else {
      const data: ShortQuestionItem = {
        type: 'short',
        form_type: 'custom',
        title: questionInput,
      };

      onAction(data);
    }
  };

  return (
    <article css={containerCss}>
      <section css={topSection}>
        <h1 css={HEAD_2_BOLD}>나만의 질문 추가</h1>
        <TextToggle
          list={TOGGLE_LIST}
          selectItem={selectToggleTab}
          onItemClick={(type) => setSelectToggleTab(type as QuestionType)}
        />
      </section>
      <section css={bottomSectionCss}>
        <textarea
          css={textAreaCss}
          value={questionInput}
          onChange={onQuestionInputChange}
          placeholder="이곳에 질문을 입력하세요"
        />
        {isChoice && (
          <ChoiceForm maxSelect={maxSelect} setMaxSelect={setMaxSelect} inputs={inputs} setInputs={setInputs} />
        )}

        <article css={[fixedBottomCss, bottomCss]}>
          <XCircleButton onClick={onClose} />
          <Button onClick={onComplete} disabled={isButtonDisabled} css={submitButtonCss}>
            완료
          </Button>
        </article>
      </section>
    </article>
  );
};

export default AddSurveyForm;

const removeSpaceAndEnter = (str: string) => str.replaceAll(' ', '').replaceAll('\n', '');

const bottomSectionCss = css`
  overflow-y: auto;
  width: 100%;
`;

const bottomCss = css`
  display: flex;
  justify-content: space-between;
`;

const submitButtonCss = css`
  width: 50%;
`;

const containerCss = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: calc(100vh - 12px);
  padding: 0 16px;
  padding-bottom: 104px;

  text-align: center;
`;

const topSection = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  padding: 16px 0 21px;

  text-align: center;
`;

const textAreaCss = (theme: Theme) => css`
  ${HEAD_1}

  resize: none;

  width: 100%;
  height: 115px;
  padding: 8px 23px;

  color: ${theme.colors.black};
  word-break: break-all;

  border: none;
  outline: none;

  &::placeholder {
    color: ${theme.colors.gray_200};
  }
`;
