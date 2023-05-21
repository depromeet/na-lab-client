import { createRef } from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import customRender from '~/__test__/customRender';

import CircleButton from './CircleButton';

describe('components/button/CircleButton', () => {
  afterEach(cleanup);

  describe('CircleButton', () => {
    test('정의되어 있어야 한다', () => {
      expect(CircleButton).toBeDefined();
    });

    test('버튼을 클릭하면 onClick이 호출된다', () => {
      const onClickMock = vi.fn();
      customRender(<CircleButton onClick={onClickMock}>test</CircleButton>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(onClickMock).toBeCalledTimes(1);
    });

    test('버튼에 ref를 전달하면 해당 ref가 button 엘리먼트를 가리킨다', () => {
      const ref = createRef<HTMLButtonElement>();
      customRender(<CircleButton ref={ref}>test</CircleButton>);

      const button = screen.getByRole('button');
      expect(ref.current).toBe(button);
    });
  });

  describe('ArrowCircleButton', () => {
    test('정의되어 있어야 한다', () => {
      expect(CircleButton).toBeDefined();
    });
  });

  describe('XCircleButton', () => {
    test('정의되어 있어야 한다', () => {
      expect(CircleButton).toBeDefined();
    });
  });
});
