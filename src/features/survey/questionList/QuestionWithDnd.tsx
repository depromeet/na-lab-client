import React from 'react';
import { css } from '@emotion/react';
import { Reorder, useDragControls } from 'framer-motion';

import MenuIcon from '~/components/icons/MenuIcon';
import Question from '~/features/survey/questionList/Question';
import { type QuestionItem } from '~/features/survey/types';

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
      <Question
        item={item}
        rightElement={<MenuIcon onPointerDown={(e) => dragControls.start(e)} css={menuIconCss} />}
      />
    </Reorder.Item>
  );
}

export default QuestionWithDnd;

const menuIconCss = css`
  touch-action: none;
`;
