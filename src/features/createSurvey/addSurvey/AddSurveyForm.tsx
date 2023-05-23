import { type ChangeEvent, useState } from 'react';
import { css, type Theme } from '@emotion/react';

import Button from '~/components/button/Button';
import { XCircleButton } from '~/components/button/CircleButton';
import ChoiceForm from '~/features/createSurvey/addSurvey/choiceForm/ChoiceForm';
import TextToggle from '~/features/createSurvey/addSurvey/TextToggle';
import { HEAD_1, HEAD_2_BOLD } from '~/styles/typo';

const TOGGLE_LIST = [
  {
    type: 'CHOICE',
    label: '객관식',
  },
  {
    type: 'SHORT_ANSWER',
    label: '주관식',
  },
];

interface Props {
  onClose: () => void;
}

const AddSurveyForm = ({ onClose }: Props) => {
  const [selectToggleTab, setSelectToggleTab] = useState(TOGGLE_LIST[0].type);
  const [questionInput, setQuestionInput] = useState('');

  const onQuestionInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 45) return alert('45자 이내로 입력해주세요.');
    setQuestionInput(e.target.value);
  };

  return (
    <article css={containerCss}>
      <section css={topSection}>
        <h1 css={HEAD_2_BOLD}>나만의 질문 추가</h1>
        <TextToggle list={TOGGLE_LIST} selectItem={selectToggleTab} onItemClick={(type) => setSelectToggleTab(type)} />
      </section>
      <textarea
        css={textAreaCss}
        value={questionInput}
        onChange={onQuestionInputChange}
        placeholder="이곳에 질문을 입력하세요"
      />
      <ChoiceForm />

      <section css={bottomCss}>
        <XCircleButton onClick={onClose} />
        <Button>완료</Button>
      </section>
    </article>
  );
};

export default AddSurveyForm;

const bottomCss = css`
  position: absolute;
  right: 16px;
  bottom: 12px;
  left: 16px;

  display: flex;
  justify-content: space-between;
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
