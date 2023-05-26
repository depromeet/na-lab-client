import { type Meta } from '@storybook/react';

import WarningIcon from '../icons/WarningIcon';
import Toast from './Toast';
import useToast from './useToast';

const meta: Meta<typeof Toast.Content> = {
  title: 'Toast',
  component: Toast.Content,
};

export default meta;

export function Default() {
  const { fireToast } = useToast();

  return (
    <div>
      <button type="button" onClick={() => fireToast({ content: '토스트 메세지 입니다' })}>
        토스트 발사
      </button>
      <button
        type="button"
        onClick={() =>
          fireToast({
            content: (
              <>
                <WarningIcon />
                <Toast.Text>토스트 메시지 with 아이콘</Toast.Text>
              </>
            ),
            higherThanCTA: true,
          })
        }
      >
        다른 토스트 발사
      </button>
    </div>
  );
}
