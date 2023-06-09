import React from 'react';
import { css } from '@emotion/react';
import { animate, Reorder, useDragControls, useMotionValue } from 'framer-motion';

import CircleDeleteIcon from '~/components/icons/CircleDeleteIcon';
import MenuIcon from '~/components/icons/MenuIcon';
import Question from '~/features/survey/questionList/Question';
import { type QuestionItem } from '~/features/survey/types';

interface Props {
  item: QuestionItem;

  onDelete: (title: string) => void;
  isDeleteMode?: boolean;
}

const inactiveShadow = '0px 0px 0px rgba(255, 255, 255, 0.8)';
const inactiveBackground = '#fff';

const activeShadow = '0px 8px 32px rgba(0, 0, 0, 0.24)';
const activeBg = '#F2F5FF';

function QuestionWithDnd({ item, onDelete, isDeleteMode }: Props) {
  const dragControls = useDragControls();

  const y = useMotionValue(0);
  const backgroundColor = useMotionValue(inactiveBackground);
  const boxShadow = useMotionValue(inactiveShadow);

  const onDragEnd = () => {
    // 중간에 멈추면 0으로 초기화
    animate(y, 0);
    animate(boxShadow, inactiveShadow);
    animate(backgroundColor, inactiveBackground);
  };

  const onDragStart = () => {
    animate(boxShadow, activeShadow);
    animate(backgroundColor, activeBg);
  };

  return (
    <Reorder.Item
      as="div"
      data-testid="dnd-item-component"
      value={item}
      drag="y"
      dragControls={dragControls}
      style={{ boxShadow, y, backgroundColor }}
      css={itemContainerCss}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <Question
        item={item}
        rightElement={
          isDeleteMode ? (
            <CircleDeleteIcon onClick={() => onDelete(item.title)} />
          ) : (
            <MenuIcon onPointerDown={(e) => dragControls.start(e)} css={menuIconCss} />
          )
        }
      />
    </Reorder.Item>
  );
}

export default QuestionWithDnd;

const itemContainerCss = css`
  position: relative;
  left: -23px;
  width: calc(100% + 23 * 2px);
  padding: 0.5rem 23px;
`;

const menuIconCss = css`
  touch-action: none;
`;
