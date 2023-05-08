import React, { useState } from 'react';
import { Reorder } from 'framer-motion';

import DndItem, { type DndItemType } from '~/features/createSurvey/dnd/DndItem';

const Dnd = ({ initItems }: { initItems: DndItemType[] }) => {
  const [items, setItems] = useState<DndItemType[]>(initItems);

  return (
    <Reorder.Group values={items} onReorder={setItems} as="section">
      {items.map((item) => (
        <DndItem item={item} key={item.id} />
      ))}
    </Reorder.Group>
  );
};

export default Dnd;
