import { type PropsWithChildren } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import CardList from '~/features/createSurvey/cardList/CardList';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...(actual as object),
    AnimatePresence: ({ children }: PropsWithChildren) => (
      <div className="mocked-framer-motion-AnimatePresence">{children}</div>
    ),
  };
});

describe('/features/createSurvey/cardList', () => {
  test('정의되어 있어야 한다', () => {
    expect(CardList).toBeDefined();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  test('cardList의 drag and drop 기능이 올바르게 동작하는지 확인한다', () => {
    const { getByTestId } = render(<CardList />);

    const boardSquares = getByTestId('dnd-component').querySelectorAll('.dnd-item-component');
    const dropSquare = boardSquares[0];
    const knight = boardSquares[1]?.firstChild;

    if (!knight) {
      throw new Error('knight is null');
    }

    fireEvent.dragStart(knight);
    fireEvent.dragEnter(dropSquare);
    fireEvent.dragOver(dropSquare);
    fireEvent.drop(dropSquare);
  });
});
