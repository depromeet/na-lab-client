import { css, type Theme } from '@emotion/react';

import CheckIcon from '~/components/icons/CheckIcon';
import EditIcon, { FillEditIcon } from '~/components/icons/EditIcon';
import EmpathizingIcon from '~/components/icons/EmpathizingIcon';
import ListIcon from '~/components/icons/ListIcon';
import MessageIcon from '~/components/icons/MessageIcon';
import ProfileIcon from '~/components/icons/ProfileIcon';
import {
  type ChoiceQuestionFeedback,
  type ShortQuestionFeedback,
} from '~/hooks/api/feedbacks/useGetAllFeedbacksBySurveyId';
import colors from '~/styles/color';
import { HEAD_2_REGULAR } from '~/styles/typo';

interface ParticipatingReviewer {
  type: 'participatingReviewer';
  title: string;
}

interface Props {
  item: ChoiceQuestionFeedback | ShortQuestionFeedback | ParticipatingReviewer;
  isObservingNow: boolean;
  onListRowClick: () => void;
}

const QuestionListRow = ({ item, isObservingNow, onListRowClick }: Props) => {
  const { css: typeCss, icon } = getType(
    item?.type,
    item?.type === 'participatingReviewer' ? undefined : item?.form_type,
  );

  return (
    <button type="button" css={(theme) => listItemCss(theme, isObservingNow)} onClick={onListRowClick}>
      <div css={[iconContainerCss, typeCss]}>{icon ?? <EditIcon color={colors.white} />}</div>
      <p css={titleCss}>{item?.title}</p>
      {isObservingNow && <CheckIcon css={checkIconCss} />}
    </button>
  );
};

export default QuestionListRow;

const listItemCss = (theme: Theme, isObservingNow: boolean) => css`
  all: unset;

  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 12px 23px;

  background-color: ${isObservingNow ? theme.colors.primary_50 : theme.colors.white};
`;

const titleCss = css`
  user-select: none;
  ${HEAD_2_REGULAR}

  overflow: hidden;
  flex-grow: 1;

  text-overflow: ellipsis;
  white-space: nowrap;
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

const checkIconCss = css`
  flex-shrink: 0;
`;

const getType = (type: 'choice' | 'short' | 'participatingReviewer', formType?: QuestionFormType) => {
  const PINK_DARK_COLOR = '#E6BFEF';
  const typeCss = css`
    background-color: ${colors.pink};
  `;

  if (type === 'participatingReviewer') {
    return {
      css: typeCss,
      icon: <ProfileIcon color={PINK_DARK_COLOR} />,
    };
  }

  if (formType === 'tendency') {
    return {
      css: typeCss,
      icon: <EmpathizingIcon color={PINK_DARK_COLOR} />,
    };
  }

  if (type === 'short') {
    if (formType === 'strength') {
      return {
        css: typeCss,
        icon: <MessageIcon />,
      };
    }

    return {
      css: css`
        background-color: ${colors.skyblue};
      `,
      icon: <FillEditIcon color={colors.skyblue_press} />,
    };
  }

  return {
    css: css`
      background-color: ${colors.yellowgreen};
    `,
    icon: <ListIcon />,
  };
};
