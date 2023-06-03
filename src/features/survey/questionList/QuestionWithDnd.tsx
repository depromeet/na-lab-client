import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { animate, type MotionValue, Reorder, useDragControls, useMotionValue } from 'framer-motion';

import MenuIcon from '~/components/icons/MenuIcon';
import Question from '~/features/survey/questionList/Question';
import { type QuestionItem } from '~/features/survey/types';

interface Props {
  item: QuestionItem;
}

function QuestionWithDnd({ item }: Props) {
  const y = useMotionValue(0);
  const { boxShadow, backgroundColor } = useRaisedShadow(y);

  const dragControls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      data-testid="dnd-item-component"
      value={item}
      dragListener={false}
      dragControls={dragControls}
      style={{ boxShadow, y, backgroundColor }}
      css={itemContainerCss}
    >
      <Question
        item={item}
        rightElement={<MenuIcon onPointerDown={(e) => dragControls.start(e)} css={menuIconCss} />}
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

const inactiveShadow = '0px 0px 0px rgba(255, 255, 255, 0.8)';
const inactiveBackground = '#fff';

const activeShadow = '0px 8px 32px rgba(0, 0, 0, 0.24)';
const activeBg = '#F2F5FF';

function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);
  const backgroundColor = useMotionValue(inactiveBackground);

  useEffect(() => {
    let isActive = false;
    value.onChange((latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, activeShadow);
          animate(backgroundColor, activeBg);
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
          animate(backgroundColor, inactiveBackground);
        }
      }
    });
  }, [value, boxShadow, backgroundColor]);

  return { boxShadow, backgroundColor };
}
