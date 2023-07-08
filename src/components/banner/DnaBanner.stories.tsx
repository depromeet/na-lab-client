import { type Meta } from '@storybook/react';

import DnaBanner from './DnaBanner';

const meta: Meta<typeof DnaBanner> = {
  title: 'DnaBanner',
  component: DnaBanner,
};

export default meta;

export function Default() {
  return <DnaBanner title="카리스마 지휘관" desc="책임감과 실행력을 겸비한 리더" />;
}
