import { css } from '@emotion/react';
import { animate, AnimatePresence, m, Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { useAtomValue } from 'jotai';

import CircleDeleteIcon from '~/components/icons/CircleDeleteIcon';
import MenuIcon from '~/components/icons/MenuIcon';
import { defaultScaleVariants } from '~/constants/motions';
import Question from '~/features/survey/questionList/Question';
import { type QuestionItem } from '~/features/survey/types';
import { surveyDeleteModeAtom } from '~/store/surveyDeleteMode';

const inactiveShadow = '0px 0px 0px rgba(255, 255, 255, 0.8)';
const inactiveBackground = '#fff';

const activeShadow = '0px 8px 32px rgba(0, 0, 0, 0.24)';
const activeBg = '#F2F5FF';

interface Props {
  item: QuestionItem;

  onDelete: (title: string) => void;
}

const QuestionWithDnd = ({ item, onDelete }: Props) => {
  const isDeleteMode = useAtomValue(surveyDeleteModeAtom);

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
      css={itemContainerCss(isDeleteMode)}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <AnimatePresence mode="wait">
        {isDeleteMode && (
          <m.div css={deleteCss} variants={defaultScaleVariants} initial="initial" animate="animate" exit="exit">
            <CircleDeleteIcon onClick={() => onDelete(item.title)} />
          </m.div>
        )}
      </AnimatePresence>

      <Question item={item} />

      {!isDeleteMode && <MenuIcon onPointerDown={(e) => dragControls.start(e)} css={menuIconCss} />}
    </Reorder.Item>
  );
};

export default QuestionWithDnd;

const deleteCss = () => css`
  position: absolute;
  top: 30px;
  left: 12px;
`;

const itemContainerCss = (isDeleteMode: boolean) => css`
  position: relative;
  left: -23px;

  display: flex;
  justify-content: space-between;

  width: calc(100% + 23 * 2px);
  padding: 0.5rem 23px;

  transition: padding 0.2s ease-in-out;

  ${isDeleteMode &&
  css`
    padding-left: 52px;
  `}
`;

const menuIconCss = css`
  touch-action: none;
  margin-top: 0.5rem;
`;
