import { type Meta } from '@storybook/react';

import Badge from './Badge';
import NewFeedbackBadge from './NewFeedbackBadge';

const meta: Meta = {
  title: 'badge',
};

export default meta;

export function Default() {
  return <Badge>foo</Badge>;
}

export function 새로운_피드백_카운트_뱃지() {
  return (
    <div>
      <NewFeedbackBadge newFeedbackCount={1} />
      <NewFeedbackBadge newFeedbackCount={8} />
      <NewFeedbackBadge newFeedbackCount={15} />
      <NewFeedbackBadge newFeedbackCount={98} />
      <NewFeedbackBadge newFeedbackCount={1214} />
    </div>
  );
}
