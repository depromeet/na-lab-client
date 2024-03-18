import { css, type Theme } from '@emotion/react';

import EditIcon, { FillEditIcon } from '~/components/icons/EditIcon';
import EmpathizingIcon from '~/components/icons/EmpathizingIcon';
import ListIcon from '~/components/icons/ListIcon';
import MessageIcon from '~/components/icons/MessageIcon';
import ProfileIcon from '~/components/icons/ProfileIcon';
import {
  type BasicQuestionItem,
  type CustomQuestionItem,
  type QuestionFormType,
  type QuestionType,
} from '~/features/survey/types';
import colors from '~/styles/color';
import { DETAIL, HEAD_3_SEMIBOLD } from '~/styles/typo';

interface Props {
  item: CustomQuestionItem | BasicQuestionItem;
}

const Question = ({ item }: Props) => {
  const { tag, css: typeCss, icon } = getType(item.type, item.form_type);

  return (
    <li css={listItemCss}>
      <div css={[iconContainerCss, typeCss]}>{icon ?? <EditIcon color={colors.white} />}</div>
      <div css={textContainerCss}>
        <p css={titleCss}>{item.title}</p>
        <span css={tagCss}>{tag}</span>
      </div>
    </li>
  );
};

export default Question;

const listItemCss = css`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  width: 100%;
  padding: 0.5rem 0;
`;

const textContainerCss = css`
  user-select: none;
  flex-grow: 1;
  min-width: 0;
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
  min-width: 50px;
  height: 50px;

  border-radius: 10px;
`;

const getType = (type: QuestionType, formType: QuestionFormType) => {
  if (type === 'basic') {
    const PINK_DARK_COLOR = '#E6BFEF';
    const typeCss = css`
      background-color: ${colors.pink};
    `;

    if (formType === 'information') {
      return {
        tag: '참여한 동료 정보',
        css: typeCss,
        icon: <ProfileIcon color={PINK_DARK_COLOR} />,
      };
    }
    if (formType === 'tendency') {
      return {
        tag: '태그',
        css: typeCss,
        icon: <EmpathizingIcon color={PINK_DARK_COLOR} />,
      };
    }

    return {
      tag: '주관식',
      css: typeCss,
      icon: <MessageIcon />,
    };
  }

  if (type === 'short') {
    return {
      tag: '주관식',
      css: css`
        background-color: ${colors.skyblue};
      `,
      icon: <FillEditIcon color={colors.skyblue_press} />,
    };
  }

  return {
    tag: '객관식',
    css: css`
      background-color: ${colors.yellowgreen};
    `,
    icon: <ListIcon />,
  };
};

const tagCss = (theme: Theme) => css`
  ${DETAIL}
  display: inline-block;
  gap: 10px;
  order: 1;

  height: 24px;
  padding: 2px 4px;

  color: ${theme.colors.gray_400};

  background: ${theme.colors.primary_50};
  border-radius: 4px;
`;
