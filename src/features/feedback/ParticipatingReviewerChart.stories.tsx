import { type Meta } from '@storybook/react';

import ParticipatingReviewerChart, { type Props } from './ParticipatingReviewerChart';

const meta: Meta<typeof ParticipatingReviewerChart> = {
  title: 'ParticipatingReviewerChart',
  component: ParticipatingReviewerChart,
};

export default meta;

const data = [
  { position: 'pm', amount: 4 },
  { position: 'developer', amount: 1 },
  { position: 'designer', amount: 5 },
  { position: 'others', amount: 1 },
] as Props[];

export function Default() {
  return (
    <div>
      <ParticipatingReviewerChart data={data} />
    </div>
  );
}
