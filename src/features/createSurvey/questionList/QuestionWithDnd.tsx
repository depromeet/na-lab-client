import React from 'react';
import { Reorder, useDragControls } from 'framer-motion';

import MenuIcon from '~/components/icons/MenuIcon';
import Question from '~/features/createSurvey/questionList/Question';
import { type QuestionItem } from '~/features/createSurvey/types';

interface Props {
  item: QuestionItem;
}

function QuestionWithDnd({ item }: Props) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      data-testid="dnd-item-component"
      value={item}
      dragListener={false}
      dragControls={dragControls}
    >
      <Question item={item} rightElement={<MenuIcon onPointerDown={(e) => dragControls.start(e)} />} />
    </Reorder.Item>
  );
}

export default QuestionWithDnd;
