import { useState } from 'react';
import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';

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

const meta: Meta<typeof CardList> = {
  title: 'Drag and drop',
  component: CardList,
};

export default meta;

export function Default() {
  return (
    <section css={containerCss}>
      <CardList />
    </section>
  );
}

export function WithDnd() {
  const [cardItems, setCardItems] = useState<CardItemType[]>(INIT_LIST);

  return (
    <section css={containerCss}>
      <CardListWithDnd items={cardItems} setItems={setCardItems} />
    </section>
  );
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
