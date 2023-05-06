import { type PropsWithChildren } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import useBoolean from '~/hooks/common/useBoolean';

import BottomSheet from './BottomSheet';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...(actual as object),
    AnimatePresence: ({ children }: PropsWithChildren) => (
      <div className="mocked-framer-motion-AnimatePresence">{children}</div>
    ),
  };
});

describe('components/portal/BottomSheet', () => {
  test('정의되어 있어야 한다', () => {
    expect(BottomSheet).toBeDefined();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const CHILDREN_TEXT = 'children';
  const onClickScrimMock = vi.fn();
  const App = ({ defaultIsShowing }: { defaultIsShowing: boolean }) => {
    const [isShowing, toggleShowing] = useBoolean(defaultIsShowing);

    return (
      <>
        <button type="button" onClick={toggleShowing}>
          toggle
        </button>
        <BottomSheet isShowing={isShowing} onClickOutside={onClickScrimMock}>
          {CHILDREN_TEXT}
        </BottomSheet>
      </>
    );
  };

  describe('isShowing', () => {
    test('true일 때, children이 보여야 한다', () => {
      render(<App defaultIsShowing={true} />);
      expect(screen.getByText(CHILDREN_TEXT)).toBeInTheDocument();
    });

    test('false일 때, children이 보이지 않는다', () => {
      render(<App defaultIsShowing={false} />);
      expect(screen.queryByText(CHILDREN_TEXT)).not.toBeInTheDocument();
    });

    test('true에서 false로 변경되면 children이 사라진다', () => {
      render(<App defaultIsShowing={true} />);
      expect(screen.getByText(CHILDREN_TEXT)).toBeInTheDocument();

      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      expect(screen.queryByText(CHILDREN_TEXT)).not.toBeInTheDocument();
    });
  });

  describe('onClickScrim', () => {
    test('children을 클릭하면 onClickScrim이 호출되지 않는다', () => {
      render(<App defaultIsShowing={true} />);

      fireEvent.click(screen.getByText(CHILDREN_TEXT));
      expect(onClickScrimMock).not.toHaveBeenCalled();
    });

    test('scrim을 클릭하면 onClickScrim이 호출된다', () => {
      render(<App defaultIsShowing={true} />);
      const scrim = screen.getByText(CHILDREN_TEXT).parentElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fireEvent.click(scrim!);
      expect(onClickScrimMock).toHaveBeenCalled();
    });
  });
});
