/* eslint-disable unicorn/filename-case */
import { type Meta } from '@storybook/react';

import Provider from '~/__storybook__/Provider';

import CTAButton from './CTAButton';

const meta: Meta<typeof CTAButton> = {
  title: 'CTAButton',
  component: CTAButton,
};

export default meta;

export function Default() {
  return (
    <Provider>
      <CTAButton>다음</CTAButton>
      <br />
      <CTAButton disabled>다음</CTAButton>
    </Provider>
  );
}

export function Blue() {
  return (
    <Provider>
      <CTAButton color="blue">다음</CTAButton>
      <br />
      <CTAButton color="blue" disabled>
        다음
      </CTAButton>
    </Provider>
  );
}
