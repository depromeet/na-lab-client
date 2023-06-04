import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { animate, type MotionValue, Reorder, useDragControls, useMotionValue, useTransform } from 'framer-motion';

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
  const { boxShadow, backgroundColor } = useRaisedShadow(y);
  const ref = useRef<HTMLDivElement | null>(null);
  const bottom = useRef<number>(100);

  const scale = useTransform(y, [0, 0, bottom.current], [1, 1, 0.8]);

  const dragControls = useDragControls();

  const handleScroll = () => {
    bottom.current = window.innerHeight - (ref.current?.getBoundingClientRect().bottom ?? 100) - DELETE_BUTTON_BOTTOM;
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
      onDragEnd={() => {
        // 중간에 멈추면 0으로 초기화
        animate(y, 0);
        offIsDrag();
      }}
      onDragStart={() => {
        onIsDrag();
      }}
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

const checkIsInner = (dragRef: React.RefObject<HTMLDivElement>, target: HTMLDivElement) => {
  if (!dragRef || !dragRef.current) return false;

  const dragRect = dragRef.current.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const isInner = dragRect.y < targetRect.y && targetRect.y < dragRect.y + dragRect.height;

  return isInner;
};
