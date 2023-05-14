import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import Card, { type CardItemType, TYPE_DESC } from '~/features/createSurvey/cardList/Card';
import CardList from '~/features/createSurvey/cardList/CardList';

const CARD_ID = 0;
const CARD_TITLE = '나의 질문 0';
const CARD_TYPE = 'CHOICE';

const CARD_ITEM_DATA: CardItemType = {
  id: CARD_ID,
  title: CARD_TITLE,
  type: CARD_TYPE,
};

describe('/features/createSurvey/cardList/Card', () => {
  test('정의되어 있어야 한다', () => {
    expect(CardList).toBeDefined();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  test('Card가 화면에 잘 나타나는가.', () => {
    const { queryByText } = render(<Card item={CARD_ITEM_DATA} />);

    expect(queryByText(CARD_TITLE)).toBeInTheDocument();
    expect(queryByText(CARD_TYPE)).not.toBeInTheDocument();
    expect(queryByText(TYPE_DESC[CARD_TYPE])).toBeInTheDocument();
  });
});
