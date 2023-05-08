import React, { useState } from 'react';
import { Reorder } from 'framer-motion';

import DndItem from '~/features/createSurvey/dnd/DndItem';

const listItems = [
  {
    id: 1,
    title: '기본 정보',
    content: '나와의 관계, 상대방의 포지션, 나의 성향',
  },
  {
    id: 2,
    title: '나의 직무적 강점은 무엇인가요?',
    content: '주관식 기본 질문',
  },
  {
    id: 3,
    title: '나의 직무적 약점은 무엇인가요?',
    content: '주관식 기본 질문',
  },
];

const Dnd = () => {
  const [items, setItems] = useState(listItems);

  return (
    <Reorder.Group values={items} onReorder={setItems} as="section">
      {items.map((item) => (
        <DndItem item={item} key={item.id} />
      ))}
    </Reorder.Group>
  );
};

export default Dnd;
