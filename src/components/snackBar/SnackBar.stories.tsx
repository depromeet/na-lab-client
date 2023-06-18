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
        스낵바 발사
      </Button>
    </div>
  );
}
