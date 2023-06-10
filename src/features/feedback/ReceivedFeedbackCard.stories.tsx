import { type Meta } from '@storybook/react';

import ReceivedFeedbackCard from './ReceivedFeedbackCard';

const meta: Meta<typeof ReceivedFeedbackCard> = {
  title: 'ReceivedFeedbackCard',
  component: ReceivedFeedbackCard,
};

export default meta;

type Position = 'developer' | 'designer' | 'product-manager' | 'other';

const feedbacks = [
  {
    feedback_id: 5,
    created_at: '2023-01-24T12:00:00',
    reply: [
      '예진이는 개발 관련 지식을 조금 더 공부해봐도 좋을 것 같아! 요즘 프로덕트 디자이너에겐 개발 지식을 아는 게 좋은 역량이 될 수 있어.',
      '안녕',
    ],
    is_read: false,
    reviwer: {
      nickname: 'A',
      reviewer_id: 1,
      collaboration_experience: true,
      position: 'developer' as Position,
    },
  },
];

export function Default() {
  return (
    <div>
      <ReceivedFeedbackCard feedback={feedbacks[0]} />
    </div>
  );
}

export function OtherFeedbackUser() {
  return (
    <div>
      <ReceivedFeedbackCard feedback={feedbacks[0]} />
    </div>
  );
}
