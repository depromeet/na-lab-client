import React from 'react';
import { Reorder, useDragControls } from 'framer-motion';

import Card, { type CardItemType } from '~/features/createSurvey/card/Card';
import ReorderIcon from '~/features/createSurvey/card/ReorderIcon';

interface Props {
  item: CardItemType;
}
function CardWithDnd({ item }: Props) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item value={item} as="div" dragListener={false} dragControls={dragControls}>
      <Card item={item} rightElement={<ReorderIcon dragControls={dragControls} />} />
    </Reorder.Item>
  );
}

export default CardWithDnd;
