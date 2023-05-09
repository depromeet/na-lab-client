import { useState } from 'react';
import { css } from '@emotion/react';
import { Reorder } from 'framer-motion';

import Card, { type CardItemType } from '~/features/createSurvey/card/Card';
import CardWithDnd from '~/features/createSurvey/card/CardWithDnd';
import PlusIcon from '~/features/createSurvey/card/PlusIcon';

const INIT_QUESTION_LIST = [
  {
    id: 1,
    title: '기본 정보',
    desc: '나와의 관계, 상대방의 포지션, 나의 성향',
  },
  {
    id: 2,
    title: '나의 직무적 강점은 무엇인가요?',
    desc: '주관식 기본 질문',
  },
  {
    id: 3,
    title: '나의 직무적 약점은 무엇인가요?',
    desc: '주관식 기본 질문',
  },
];

function CardList({ initItems }: { initItems: CardItemType[] }) {
  const [items, setItems] = useState<CardItemType[]>(initItems);

  return (
    <Reorder.Group
      as="section"
      values={items}
      onReorder={setItems}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}
    >
      {INIT_QUESTION_LIST.map((item) => {
        return <Card item={item} key={item.id} />;
      })}
      {items.map((item) => {
        return <CardWithDnd item={item} key={item.id} />;
      })}
      <div
        css={css`
          cursor: pointer;

          display: flex;
          flex-direction: column;
          gap: 11px;
          align-items: center;
          justify-content: center;

          padding: 25px 106px;

          color: #37c3ff;

          background-color: #f7f8f9;
          border-radius: 12px;
        `}
      >
        <PlusIcon />
        <span>나만의 질문 추가하기</span>
      </div>
    </Reorder.Group>
  );
}

export default CardList;
