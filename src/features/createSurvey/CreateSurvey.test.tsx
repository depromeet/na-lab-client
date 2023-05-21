import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import CardList from '~/features/createSurvey/cardList/CardList';

// TODO : 테스트 코드 재작성
describe('/features/createSurvey/cardList/CardListWithDnd', () => {
  test('정의되어 있어야 한다', () => {
    expect(CardList).toBeDefined();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  // test('cardList의 추가 버튼을 1번 클릭하면 dnd card가 하나 추가된다.', () => {
  //   const { getByRole, getAllByTestId } = render(<CreateSurvey />);

  //   const button = getByRole('button', { name: '나만의 질문 추가하기' });
  //   fireEvent.click(button);

  //   const cardItems = getAllByTestId('dnd-item-component');

  //   expect(cardItems).toHaveLength(1);
  // });

  // test('cardList의 추가 버튼을 2번 클릭하면 dnd card가 두개 추가된다.', () => {
  //   const { getByRole, getAllByTestId } = render(<CreateSurvey />);

  //   const button = getByRole('button', { name: '나만의 질문 추가하기' });
  //   fireEvent.click(button);
  //   fireEvent.click(button);

  //   const cardItems = getAllByTestId('dnd-item-component');

  //   expect(cardItems).toHaveLength(2);
  // });
});
