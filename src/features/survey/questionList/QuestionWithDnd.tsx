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

const inactiveShadow = '0px 0px 0px rgba(255, 255, 255, 0.8)';
const inactiveBackground = '#fff';

const activeShadow = '0px 8px 32px rgba(0, 0, 0, 0.24)';
const activeBg = '#F2F5FF';

function QuestionWithDnd({ item, dragRef, onIsDrag, offIsDrag, onDelete }: Props) {
  const dragControls = useDragControls();

  const ref = useRef<HTMLDivElement | null>(null);
  const bottom = useRef<number>(100);

  const y = useMotionValue(0);
  const backgroundColor = useMotionValue(inactiveBackground);
  const boxShadow = useMotionValue(inactiveShadow);
  const scale = useTransform(y, [0, 0, bottom.current], [1, 1, 0.8]);

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

  const onItemPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    const target = e.target as HTMLDivElement;
    console.warn('dragRef: ', dragRef);

    if (dragRef && checkIsInner(dragRef, target)) {
      console.warn('delete', item.title);
      onDelete(item.title);
    } else {
      console.warn('not delete');
    }
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
      ref={ref}
      drag="y"
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: bottom.current }}
      style={{ boxShadow, y, backgroundColor, scale }}
      css={itemContainerCss}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <Question
        item={item}
        rightElement={
          <MenuIcon onPointerDown={(e) => dragControls.start(e)} onPointerUp={onItemPointerUp} css={menuIconCss} />
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

const checkIsInner = (dragRef: React.RefObject<HTMLDivElement>, target: HTMLDivElement) => {
  if (!dragRef || !dragRef.current) return false;

  const dragRect = dragRef.current.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const isInner = dragRect.y < targetRect.y && targetRect.y < dragRect.y + dragRect.height;
  console.warn('y: ', dragRect.y, targetRect.y);

  return isInner;
};
