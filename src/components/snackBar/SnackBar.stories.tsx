import { type Meta } from '@storybook/react';

import useInput from '~/hooks/common/useInput';

import Button from '../button/Button';
import useSnackBar from './useSnackBar';

const meta: Meta = {
  title: 'Snack bar',
};

export default meta;

export function Default() {
  const [value, onChange] = useInput();

  const { fireSnackBar } = useSnackBar();

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />

      <Button
        onClick={() => {
          fireSnackBar({ content: value });
        }}
      >
        기본 스낵바 발사
      </Button>
      <br />

      <Button
        onClick={() => {
          fireSnackBar({ content: value, isRenderDeleteElement: false, duration: 3000 });
        }}
      >
        삭제 버튼 없는 스낵바
      </Button>

      <br />

      <Button
        onClick={() => {
          fireSnackBar({ content: value, deleteElement: '삭제임' });
        }}
      >
        커스텀 삭제 버튼
      </Button>
    </div>
  );
}
