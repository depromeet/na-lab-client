import { useState } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { type CardItemType } from '~/features/createSurvey/cardList/Card';
import CardList from '~/features/createSurvey/cardList/CardList';
import CardListWithDnd from '~/features/createSurvey/cardList/CardListWithDnd';

const INIT_LIST: CardItemType[] = [
  {
    id: 0,
    title: '나의 질문 0',
    type: 'CHOICE',
  },
  {
    id: 1,
    title: '나의 질문 1',
    type: 'CHOICE',
  },
  {
    id: 2,
    title: '나의 질문 2',
    type: 'CHOICE',
  },
];

describe('/features/createSurvey/cardList/CardListWithDnd', () => {
  test('정의되어 있어야 한다', () => {
    expect(CardList).toBeDefined();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  const App = () => {
    const [items, setItems] = useState<CardItemType[]>(INIT_LIST);

    return <CardListWithDnd items={items} setItems={setItems} />;
  };

  test('CardListWithDnd에서 드래그 앤 드롭이 가능하다.', () => {
    const { getAllByTestId } = render(<App />);
    const cardItems = getAllByTestId('dnd-item-component');

    const lastIndex = cardItems.length;

    const firstCardItem = cardItems[0];
    const lastCardItem = cardItems[lastIndex - 1];

    if (!lastCardItem) {
      throw new Error('lastCardItem is null');
    }

    fireEvent.dragStart(lastCardItem);
    fireEvent.dragEnter(firstCardItem);
    fireEvent.dragOver(firstCardItem);
    fireEvent.drop(firstCardItem);
  });
});
