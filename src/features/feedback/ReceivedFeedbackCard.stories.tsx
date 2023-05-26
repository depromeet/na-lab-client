import { type Meta } from '@storybook/react';

import ReceivedFeedbackCard from './ReceivedFeedbackCard';

const meta: Meta<typeof ReceivedFeedbackCard> = {
  title: 'ReceivedFeedbackCard',
  component: ReceivedFeedbackCard,
};

export default meta;

export function Default() {
  return (
    <div>
      <ReceivedFeedbackCard isRead={false} feedbackUser="개발자 A" isCollaborate={true} />
    </div>
  );
}

export function OtherFeedbackUser() {
  return (
    <div>
      <ReceivedFeedbackCard isRead={true} feedbackUser="기획자 A" isCollaborate={false} />
    </div>
  );
}
