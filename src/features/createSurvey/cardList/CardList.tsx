import { useState } from 'react';
import { css } from '@emotion/react';
import { Reorder } from 'framer-motion';

import Card, { type CardItemType } from '~/features/createSurvey/cardList/Card';
import CardWithDnd from '~/features/createSurvey/cardList/CardWithDnd';
import PlusIcon from '~/features/createSurvey/cardList/PlusIcon';

const INIT_QUESTION_LIST: CardItemType[] = [
  {
    id: 1,
    title: '기본 정보',
    type: 'BASIC',
  },
  {
    id: 2,
    title: '나의 직무적 강점은 무엇인가요?',
    type: 'BASIC',
  },
  {
    id: 3,
    title: '나의 직무적 약점은 무엇인가요?',
    type: 'BASIC',
  },
];

function CardList() {
  const [items, setItems] = useState<CardItemType[]>([]);

  // TODO : 서버 API 명세서 참고해서 type 변경
  const handleNewItemAdd = () => {
    setItems((prev) => {
      const newId = prev.length;
      return [
        ...prev,
        {
          id: newId,
          title: `나의 질문 ${newId}`,
          type: 'CHOICE',
        },
      ];
    });
  };

  return (
    <section css={containerCss}>
      <Reorder.Group data-testid="dnd-component" as="ul" values={items} onReorder={setItems} css={containerCss}>
        {INIT_QUESTION_LIST.map((item) => {
          return <Card item={item} key={item.id} />;
        })}
        {items.map((item) => {
          return <CardWithDnd item={item} key={item.id} />;
        })}
      </Reorder.Group>
      <button type="button" onClick={handleNewItemAdd} css={buttonCss}>
        <PlusIcon />
        <span>나만의 질문 추가하기</span>
      </button>
    </section>
  );
}

export default CardList;

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const buttonCss = css`
  all: unset;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 11px;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 25px 106px;

  color: #37c3ff;

  background-color: #f7f8f9;
  border-radius: 12px;
`;
