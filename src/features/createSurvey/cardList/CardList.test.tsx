import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import CardList from '~/features/createSurvey/cardList/CardList';

describe('/features/createSurvey/cardList', () => {
  test('정의되어 있어야 한다', () => {
    expect(CardList).toBeDefined();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  test('cardList의 drag and drop 기능이 올바르게 동작하는지 확인한다', () => {
    const { getByTestId, getByRole } = render(<CardList />);

    const button = getByRole('button', { name: '나만의 질문 추가하기' });
    fireEvent.click(button);
    fireEvent.click(button);

    const boardSquares = getByTestId('dnd-component').querySelectorAll('.dnd-item-component');
    const lastIndex = boardSquares.length;

    const dropSquare = boardSquares[0];
    const knight = boardSquares[lastIndex - 1]?.firstChild;

    if (!knight) {
      throw new Error('knight is null');
    }

    fireEvent.dragStart(knight);
    fireEvent.dragEnter(dropSquare);
    fireEvent.dragOver(dropSquare);
    fireEvent.drop(dropSquare);
  });

  test('cardList의 추가 버튼을 1번 클릭하면 dnd card가 하나 추가된다.', () => {
    const { getByRole, getByTestId } = render(<CardList />);

    const button = getByRole('button', { name: '나만의 질문 추가하기' });
    fireEvent.click(button);

    const items = getByTestId('dnd-component').querySelectorAll('.dnd-item-component');
    expect(items).toHaveLength(1);
  });
});
