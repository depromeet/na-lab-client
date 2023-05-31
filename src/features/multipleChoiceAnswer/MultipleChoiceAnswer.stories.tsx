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
      <MultipleChoiceAnswer
        variant="default"
        totalCount={3}
        answeredCount={1}
        answerText="UX가 좋습니다 졸려일무 무리무리무리루"
      />
    </div>
  );
}

export function Highlighted() {
  return (
    <div>
      <MultipleChoiceAnswer
        variant="highlighted"
        totalCount={3}
        answeredCount={2}
        answerText="UX가 좋습니다 졸려일무 무리무리무리루"
      />
    </div>
  );
}

export function Hightlighted100percent() {
  return (
    <div>
      <MultipleChoiceAnswer
        variant="highlighted"
        totalCount={3}
        answeredCount={3}
        answerText="UX가 좋습니다 졸려일무 무리무리무리루"
      />
    </div>
  );
}
