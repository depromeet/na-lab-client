import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;

export function Default() {
  return (
    <div>
      <Button>다음</Button>
      <br />
      <Button disabled>다음</Button>
    </div>
  );
}

export function Blue() {
  return (
    <div>
      <Button color="blue">다음</Button>
      <br />
      <Button color="blue" disabled>
        다음
      </Button>
    </div>
  );
}

export function Gray() {
  return (
    <div>
      <Button color="gray">다음</Button>
      <br />
      <Button color="gray" disabled>
        다음
      </Button>
    </div>
  );
}

export function StyleOverride() {
  return (
    <Button
      css={css`
        padding: 10px 20px;
        color: red;
      `}
    >
      다음
    </Button>
  );
}
