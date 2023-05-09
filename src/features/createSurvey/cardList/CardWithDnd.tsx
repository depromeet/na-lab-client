import React from 'react';
import { Reorder, useDragControls } from 'framer-motion';

import Card, { type CardItemType } from '~/features/createSurvey/cardList/Card';
import ReorderIcon from '~/features/createSurvey/cardList/ReorderIcon';

interface Props {
  item: CardItemType;
}
function CardWithDnd({ item }: Props) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item className="dnd-item-component" value={item} as="div" dragListener={false} dragControls={dragControls}>
      <Card item={item} rightElement={<ReorderIcon dragControls={dragControls} />} />
    </Reorder.Item>
  );
}

export default CardWithDnd;
