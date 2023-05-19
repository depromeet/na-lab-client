/* eslint-disable unicorn/filename-case */
import { type Meta } from '@storybook/react';

import CTAButton from './CTAButton';

const meta: Meta<typeof CTAButton> = {
  title: 'CTAButton',
  component: CTAButton,
};

export default meta;

export function Default() {
  return (
    <div>
      <CTAButton>다음</CTAButton>
      <br />
      <CTAButton disabled>다음</CTAButton>
    </div>
  );
}

export function Blue() {
  return (
    <div>
      <CTAButton color="blue">다음</CTAButton>
      <br />
      <CTAButton color="blue" disabled>
        다음
      </CTAButton>
    </div>
  );
}
