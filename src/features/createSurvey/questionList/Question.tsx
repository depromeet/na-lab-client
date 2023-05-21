import { type ReactNode } from 'react';
import { css, type Theme } from '@emotion/react';

import EditIcon from '~/components/icons/EditIcon';
import { type QuestionFormType, type QuestionItem, type QuestionType } from '~/features/createSurvey/types';
import { DETAIL, HEAD_3_SEMIBOLD } from '~/styles/typo';

interface Props {
  item: QuestionItem;
  rightElement?: ReactNode;
}

const Question = ({ item, rightElement }: Props) => {
  const { tag, css: typeCss } = getType(item.type, item.form_type);

  return (
    <li css={listItemCss}>
      <div css={[iconContainerCss, typeCss]}>
        <EditIcon color="#fff" />
      </div>
      <div css={textContainerCss}>
        <p css={titleCss}>{item.title}</p>
        <span css={tagCss}>{tag}</span>
      </div>
      {rightElement}
    </li>
  );
};

export default Question;

const listItemCss = css`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 8px 23px;
`;

const textContainerCss = css`
  user-select: none;
  flex-grow: 1;
`;

const titleCss = css`
  ${HEAD_3_SEMIBOLD}

  margin-bottom: 8px;
`;

const iconContainerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 10px;
`;

const basicInformationCss = (theme: Theme) => css`
  background-color: ${theme.colors.bluegreen};
`;
const shortCss = (theme: Theme) => css`
  background-color: ${theme.colors.yellowgreen};
`;

const choiceCss = (theme: Theme) => css`
  background-color: ${theme.colors.pink};
`;

const getType = (type: QuestionType, formType: QuestionFormType) => {
  if (formType === 'tendency') {
    return {
      tag: '기본정보',
      css: basicInformationCss,
    };
  }
  if (type === 'short') {
    return {
      tag: '주관식',
      css: shortCss,
    };
  }

  return {
    tag: '객관식',
    css: choiceCss,
  };
};

const tagCss = (theme: Theme) => css`
  ${DETAIL}

  gap: 10px;
  order: 1;

  padding: 2px 4px;

  color: ${theme.colors.gray_400};

  /* $primary.50 (background) */

  background: ${theme.colors.primary_50};
  border-radius: 4px;
`;
