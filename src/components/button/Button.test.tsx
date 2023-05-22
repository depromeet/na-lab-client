import { createRef } from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import customRender from '~/__test__/customRender';

import Button from './Button';

describe('components/button/Button', () => {
  test('정의되어 있어야 한다', () => {
    expect(Button).toBeDefined();
  });

  afterEach(cleanup);

  describe('children', () => {
    test('string children', () => {
      customRender(<Button>test</Button>);
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    test('element children', () => {
      customRender(
        <Button>
          <h1>test</h1>
        </Button>,
      );
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    test('버튼을 클릭하면 onClick이 호출된다', () => {
      const onClickMock = vi.fn();
      customRender(<Button onClick={onClickMock}>test</Button>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(onClickMock).toBeCalledTimes(1);
    });
  });

  describe('ref', () => {
    test('버튼에 ref를 전달하면 해당 ref가 button 엘리먼트를 가리킨다', () => {
      const ref = createRef<HTMLButtonElement>();
      customRender(<Button ref={ref}>test</Button>);

      const button = screen.getByRole('button');
      expect(ref.current).toBe(button);
    });
  });
});
