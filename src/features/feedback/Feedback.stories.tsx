import { css, type Theme } from '@emotion/react';
import { type Meta } from '@storybook/react';

import Feedback from './Feedback';

const meta: Meta<typeof Feedback> = {
  title: 'Feedback',
  component: Feedback,
};

export default meta;

const feedbacks = [
  {
    feedback_id: 5,
    created_at: '2023-01-24T12:00:00',
    reply: [
      '예진이는 개발 관련 지식을 조금 더 공부해봐도 좋을 것 같아! 요즘 프로덕트 디자이너에겐 개발 지식을 아는 게 좋은 역량이 될 수 있어.',
      '안녕',
    ],
    is_read: false,
    reviewer: {
      nickname: 'A',
      reviewer_id: 1,
      collaboration_experience: true,
      position: 'developer' as ReviewerPosition,
    },
  },
  {
    feedback_id: 6,
    created_at: '2023-01-24T12:00:00',
    reply: ['이건', '테스트', '테스트2', '테스트33', '와우', '안녕'],
    is_read: false,
    reviewer: {
      nickname: 'AX',
      reviewer_id: 2,
      collaboration_experience: false,
      position: 'designer' as ReviewerPosition,
    },
  },
  {
    feedback_id: 7,
    created_at: '2023-01-24T12:00:00',
    reply: [
      '피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백',
    ],
    is_read: true,
    reviewer: {
      nickname: 'K',
      reviewer_id: 3,
      collaboration_experience: true,
      position: 'others' as ReviewerPosition,
    },
  },
  {
    feedback_id: 8,
    created_at: '2023-01-24T12:00:00',
    reply: [
      '피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피드백피',
    ],
    is_read: true,
    reviewer: {
      nickname: 'BC',
      reviewer_id: 4,
      collaboration_experience: true,
      position: 'pm' as ReviewerPosition,
    },
  },
];

export function Default() {
  return (
    <>
      <div css={backgroundCss} />
      <div css={feedbackContainerCss}>
        {feedbacks.map((feedback) => (
          <Feedback
            key={feedback.feedback_id}
            reply={feedback.reply}
            is_read={feedback.is_read}
            reviewer={feedback.reviewer}
            form_question_feedback_id={''}
            is_bookmarked={false}
          />
        ))}
      </div>
    </>
  );
}

const backgroundCss = ({ colors }: Theme) => css`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${colors.gray_50};
`;

const feedbackContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
