import { type Meta } from '@storybook/react';

import AddMyQuestion from './AddMyQuestion';

const meta: Meta<typeof AddMyQuestion> = {
  title: 'AddMyQuestion',
  component: AddMyQuestion,
};

export default meta;

export function Default() {
  const onAction = () => {
    alert('추가 버튼을 클릭하였습니다.');
  };

  return <AddMyQuestion onAction={onAction} />;
}
