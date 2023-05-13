import { type PropsWithChildren } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import useBoolean from '~/hooks/common/useBoolean';

import Dialog from './Dialog';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...(actual as object),
    AnimatePresence: ({ children }: PropsWithChildren) => <div>{children}</div>,
  };
});

describe('components/Dialog', () => {
  test('정의되어 있는가', () => {
    expect(Dialog).toBeDefined();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const onClickOutsideMock = vi.fn();
  const App = ({ defaultIsShowing }: { defaultIsShowing: boolean }) => {
    const [isShowing, _, onOpen, onClose] = useBoolean(defaultIsShowing);
    const confirm = vi.fn();

    return (
      <>
        <button data-testid="openButton" type="button" onClick={onOpen}>
          dialog button
        </button>
        <Dialog
          isShowing={isShowing}
          onClickOutside={() => {
            onClickOutsideMock();
            onClose();
          }}
          title={'이대로 질문 폼을 생성할까요?'}
          description={'한 번 만든 질문 폼은 수정할 수 없어요.'}
          cancelButton={
            <button data-testid="cancelButton" type="button" onClick={onClose}>
              다시 볼게요
            </button>
          }
          confirmButton={
            <button data-testid="confirmButton" type="button" onClick={confirm}>
              네
            </button>
          }
        />
      </>
    );
  };

  describe('isShowing 값에 따라 dialog가 나타나고 사라지는가', () => {
    test('isShowing이 true면 dialog가 보인다', () => {
      render(<App defaultIsShowing={true} />);
      expect(screen.queryByText('이대로 질문 폼을 생성할까요?')).toBeInTheDocument();
    });

    test('isShowing이 false면 dialog가 보이지 않는다', () => {
      render(<App defaultIsShowing={false} />);
      expect(screen.queryByText('이대로 질문 폼을 생성할까요?')).not.toBeInTheDocument();
    });

    test('isShowing을 변경해서 dialog를 켜고 끌 수 있다', () => {
      render(<App defaultIsShowing={true} />);
      expect(screen.queryByText('이대로 질문 폼을 생성할까요?')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('cancelButton'));
      expect(screen.queryByText('이대로 질문 폼을 생성할까요?')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('openButton'));
      expect(screen.queryByText('이대로 질문 폼을 생성할까요?')).toBeInTheDocument();
    });
  });

  describe('scrim을 클릭하여 onClickOutside을 호출할 수 있는가', () => {
    test('children을 클릭하면 onClickOutside이 호출되지 않는다', () => {
      render(<App defaultIsShowing={true} />);

      fireEvent.click(screen.getByTestId('cancelButton'));
      expect(onClickOutsideMock).not.toHaveBeenCalled();
    });

    test('scrim을 클릭하면 onClickOutside이 호출된다', () => {
      render(<App defaultIsShowing={true} />);
      const scrim = screen.getByTestId('cancelButton').parentElement?.parentElement?.previousElementSibling;

      fireEvent.click(scrim!);
      expect(onClickOutsideMock).toHaveBeenCalled();
    });
  });
});
