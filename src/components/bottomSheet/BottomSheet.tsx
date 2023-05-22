import { type ComponentProps, type MouseEventHandler } from 'react';
import { css } from '@emotion/react';
import { m, type Variants } from 'framer-motion';

import { defaultEasing, defaultFadeInVariants } from '~/constants/motions';

import BottomSheetHandleIcon from '../icons/BottomSheetHandleIcon';
import AnimatePortal from '../portal/AnimatePortal';
import { scrimCss } from '../scrim/default.style';
import Question from './Question';

// todo 서버에서 데이터 어떻게 보내주는지 보고 수정하기
// todo toggle 클릭하면 나오게 만들기
// todo QuestionWrapper 컴포넌트로 빼서 map으로 돌려주기

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
            <Question />
            <Question />
            <Question />
            <Question />
            <Question />
            <Question />
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
