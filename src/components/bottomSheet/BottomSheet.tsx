import { type ComponentProps, type MouseEventHandler } from 'react';
import { css } from '@emotion/react';
import { m, type Variants } from 'framer-motion';

import { defaultEasing, defaultFadeInVariants } from '~/constants/motions';

import { BASIC_QUESTION_LIST } from '../../features/createSurvey/constants';
import BottomSheetHandleIcon from '../icons/BottomSheetHandleIcon';
import AnimatePortal from '../portal/AnimatePortal';
import { scrimCss } from '../scrim/default.style';
import Question from './Question';

interface Props extends ComponentProps<typeof AnimatePortal> {
  /**
   * scrim을 클릭했을 때 실행되는 함수이며, 기본적으로 target을 확인한 후 실행됩니다
   */
  onClickOutside?: VoidFunction;
}

const BottomSheet = ({ onClickOutside, isShowing, mode }: Props) => {
  const onClickOutsideDefault: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOutside) onClickOutside();
  };

  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <m.div
        onClick={onClickOutsideDefault}
        css={scrimCss}
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <m.div css={contentCss} variants={bottomSheetVariants}>
          <BottomSheetHandleIcon />
          <section css={QuestionListWrapperCss}>
            {BASIC_QUESTION_LIST.map((question, idx) => {
              // TODO 추후 서버에서 받아온 데이터로 key값 변경, 기본 질문 이외의 질문도 대응
              return <Question key={idx} question={question.title} />;
            })}
          </section>
        </m.div>
      </m.div>
    </AnimatePortal>
  );
};

export default BottomSheet;

const contentCss = css`
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  /* TODO: 디자인에 따라 변경 필요 */
  min-height: 300px;
  max-height: 68%;
  padding-top: 6px;

  /* padding-right: 20px;
  padding-left: 20px; */

  /* TODO: 디자인에 따라 변경 필요 */
  background-color: #fff;
  border-radius: 16px 16px 0 0;
`;

const bottomSheetVariants: Variants = {
  initial: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  animate: {
    y: '-100%',
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  exit: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
};

const QuestionListWrapperCss = css`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  max-height: 100%;
  padding-top: 10px;
`;
