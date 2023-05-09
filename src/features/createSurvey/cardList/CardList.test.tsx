import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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
    const { getByRole } = render(<CardList />);

    const button = getByRole('button', { name: '나만의 질문 추가하기' });
    fireEvent.click(button);
    fireEvent.click(button);

    const cardItems = screen.getAllByTestId('dnd-item-component');
    const lastIndex = cardItems.length;

    const firstCardItem = cardItems[0];
    const lastCardItem = cardItems[lastIndex - 1]?.firstChild;

    if (!lastCardItem) {
      throw new Error('lastCardItem is null');
    }

    fireEvent.dragStart(lastCardItem);
    fireEvent.dragEnter(firstCardItem);
    fireEvent.dragOver(firstCardItem);
    fireEvent.drop(firstCardItem);
  });

  test('cardList의 추가 버튼을 1번 클릭하면 dnd card가 하나 추가된다.', () => {
    const { getByRole } = render(<CardList />);

    const button = getByRole('button', { name: '나만의 질문 추가하기' });
    fireEvent.click(button);

    const cardItems = screen.getAllByTestId('dnd-item-component');

    expect(cardItems).toHaveLength(1);
  });
});
