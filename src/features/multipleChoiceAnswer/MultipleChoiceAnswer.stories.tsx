import { type Meta } from '@storybook/react';

import MultipleChoiceAnswer from './MultipleChoiceAnswer';

const meta: Meta<typeof MultipleChoiceAnswer> = {
  title: 'MultipleChoiceAnswer',
  component: MultipleChoiceAnswer,
};

export default meta;

export function Default() {
  return (
    <div>
      <MultipleChoiceAnswer variant="default" totalCount={3} answeredCount={1} />
    </div>
  );
}

export function Highlighted() {
  return (
    <div>
      <MultipleChoiceAnswer variant="highlighted" totalCount={3} answeredCount={2} />
    </div>
  );
}

export function Hightlighted100percent() {
  return (
    <div>
      <MultipleChoiceAnswer variant="highlighted" totalCount={3} answeredCount={3} />
    </div>
  );
}
