import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { animate, Reorder, useDragControls, useMotionValue, useTransform } from 'framer-motion';

import MenuIcon from '~/components/icons/MenuIcon';
import Question from '~/features/survey/questionList/Question';
import { type QuestionItem } from '~/features/survey/types';

interface Props {
  item: QuestionItem;

  dragRef?: React.RefObject<HTMLDivElement>;

  offIsDrag: () => void;
  onIsDrag: () => void;
  onDelete: (title: string) => void;
}

const DELETE_BUTTON_BOTTOM = 90;

function QuestionWithDnd({ item, dragRef, onIsDrag, offIsDrag, onDelete }: Props) {
  const y = useMotionValue(0);

  const boxShadow = useMotionValue(inactiveShadow);
  const backgroundColor = useMotionValue(inactiveBackground);

  const ref = useRef<HTMLDivElement | null>(null);
  const bottom = useRef<number>(100);

  const scale = useTransform(y, [0, 0, bottom.current], [1, 1, 0.8]);

  const dragControls = useDragControls();

  const handleScroll = () => {
    bottom.current = window.innerHeight - (ref.current?.getBoundingClientRect().bottom ?? 100) - DELETE_BUTTON_BOTTOM;
  };

  const onDragEnd = () => {
    // 중간에 멈추면 0으로 초기화
    animate(y, 0);
    animate(boxShadow, inactiveShadow);
    animate(backgroundColor, inactiveBackground);
    offIsDrag();
  };

  const onDragStart = () => {
    onIsDrag();
    animate(boxShadow, activeShadow);
    animate(backgroundColor, activeBg);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  return (
    <Reorder.Item
      as="div"
      data-testid="dnd-item-component"
      value={item}
      dragListener={false}
      dragControls={dragControls}
      drag="y"
      ref={ref}
      dragConstraints={{ top: 0, bottom: bottom.current }}
      style={{ boxShadow, y, backgroundColor, scale }}
      css={itemContainerCss}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <Question
        item={item}
        rightElement={
          <MenuIcon
            onPointerDown={(e) => {
              dragControls.start(e);
            }}
            onPointerUp={(e) => {
              const target = e.target as HTMLDivElement;

              if (dragRef && checkIsInner(dragRef, target)) {
                onDelete(item.title);
              }
            }}
            css={menuIconCss}
          />
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

const inactiveShadow = '0px 0px 0px rgba(255, 255, 255, 0.8)';
const inactiveBackground = '#fff';

const activeShadow = '0px 8px 32px rgba(0, 0, 0, 0.24)';
const activeBg = '#F2F5FF';

const checkIsInner = (dragRef: React.RefObject<HTMLDivElement>, target: HTMLDivElement) => {
  if (!dragRef || !dragRef.current) return false;

  const dragRect = dragRef.current.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const isInner = dragRect.y < targetRect.y && targetRect.y < dragRect.y + dragRect.height;

  return isInner;
};
