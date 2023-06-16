import { type Meta } from '@storybook/react';

import ResearchMoveButton from './ResearchMoveAnchor';

const meta: Meta<typeof ResearchMoveButton> = {
  title: 'ResearchMoveButton',
  component: ResearchMoveButton,
};

export default meta;

export function Default() {
  return (
    <div>
      <ResearchMoveButton newFeedbackNumber={1} surveyId="1" />
    </div>
  );
}
