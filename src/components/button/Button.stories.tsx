import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';

import Provider from '~/__storybook__/Provider';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;

export function Default() {
  return (
    <Provider>
      <Button>다음</Button>
      <br />
      <Button disabled>다음</Button>
    </Provider>
  );
}

export function Blue() {
  return (
    <Provider>
      <Button color="blue">다음</Button>
      <br />
      <Button color="blue" disabled>
        다음
      </Button>
    </Provider>
  );
}

export function Gray() {
  return (
    <Provider>
      <Button color="gray">다음</Button>
      <br />
      <Button color="gray" disabled>
        다음
      </Button>
    </Provider>
  );
}

export function StyleOverride() {
  return (
    <Provider>
      <Button
        css={css`
          padding: 10px 20px;
          color: red;
        `}
      >
        다음
      </Button>
    </Provider>
  );
}
