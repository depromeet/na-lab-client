import { type ChangeEvent, useState } from 'react';
import { css, type Theme } from '@emotion/react';

import ChoiceForm from '~/features/createSurvey/addSurvey/choiceForm/ChoiceForm';
import TextToggle from '~/features/createSurvey/addSurvey/TextToggle';
import { type QuestionType } from '~/features/createSurvey/types';
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

const AddSurveyForm = () => {
  const [selectToggleTab, setSelectToggleTab] = useState<QuestionType>(TOGGLE_LIST[0].type);
  const [questionInput, setQuestionInput] = useState('');

  const onQuestionInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 45) return alert('45자 이내로 입력해주세요.');
    setQuestionInput(e.target.value);
  };

  return (
    <div css={containerCss}>
      <section css={topSection}>
        <h1 css={HEAD_2_BOLD}>나만의 질문 추가</h1>
        <TextToggle
          list={TOGGLE_LIST}
          selectItem={selectToggleTab}
          onItemClick={(type) => setSelectToggleTab(type as QuestionType)}
        />
      </section>
      <textarea
        css={textAreaCss}
        value={questionInput}
        onChange={onQuestionInputChange}
        placeholder="이곳에 질문을 입력하세요"
      />
      <ChoiceForm />
    </div>
  );
};

export default AddSurveyForm;

const containerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
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
