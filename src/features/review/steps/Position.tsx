import { Fade, Perspective } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

import { defaultFadeInVariants } from '~/constants/motions';

import BottomNavigation from '../BottomNavigation';
import QuestionHeader from '../QuestionHeader';
import { type StepProps } from './type';

import '@egjs/react-flicking/dist/flicking.css';

interface Props extends StepProps {
  position?: string;
}

const Position = ({ prev, next }: Props) => {
  const plugins = [new Perspective({ rotate: 0.2, scale: 0.2 }), new Fade('', 1.1)];

  return (
    <>
      <QuestionHeader title="당신의 포지션을 알려주세요." />
      <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
        <Flicking align="center" plugins={plugins} css={positionWrapperCss}>
          <div key="1" className="panel" css={testCss}>
            1
          </div>
          <div key="2" className="panel" css={testCss}>
            2
          </div>
          <div key="3" className="panel" css={testCss}>
            3
          </div>
        </Flicking>
      </m.section>
      <BottomNavigation onBackClick={prev} onNextClick={next} />
    </>
  );
};

export default Position;

const sectionCss = css`
  position: relative;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;

  height: 100%;
`;

const positionWrapperCss = css`
  position: fixed;
  left: 0;
  width: 100vw;
`;

const testCss = css`
  width: 210px;
  height: 280px;

  /* margin-right: 30px; */
  background-color: blue;
`;
