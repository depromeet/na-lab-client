import { SessionProvider } from 'next-auth/react';
import { type Meta, type StoryObj } from '@storybook/react';

import KakaoLoginButton from './KakaoLoginButton';

const meta: Meta<typeof KakaoLoginButton> = {
  title: 'KakaoLoginButton',
  component: KakaoLoginButton,
};

export default meta;

type Story = StoryObj<typeof KakaoLoginButton>;

export const Primary: Story = {
  render: () => (
    <SessionProvider>
      <KakaoLoginButton />
    </SessionProvider>
  ),
};
