import { type Meta } from '@storybook/react';

import Button from '../button/Button';
import PlusIcon from '../icons/PlusIcon';
import Toast from './Toast';
import useToast from './useToast';

const meta: Meta<typeof Toast> = {
  title: 'Toast',
  component: Toast,
};

export default meta;

export function Default() {
  const { isShowing: isShowing1, showToast: showToast1, closeToast: closeToast1 } = useToast();
  const { isShowing: isShowing2, showToast: showToast2, closeToast: closeToast2 } = useToast();

  const handleButton = (showToast: () => void) => {
    closeToast1();
    closeToast2();
    showToast();
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleButton(showToast1);
        }}
      >
        버튼
      </Button>
      <Button
        onClick={() => {
          handleButton(showToast2);
        }}
      >
        버튼2
      </Button>

      <Toast isShowing={isShowing1} text="첫번째 버튼을 클릭하면 나오는 토스트" onToastClick={closeToast1} />
      <Toast isShowing={isShowing2} text="두번째 버튼을 클릭하면 나오는 토스트와 아이콘" icon={<PlusIcon />} />
    </div>
  );
}
