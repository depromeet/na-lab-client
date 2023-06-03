import { type ComponentProps } from 'react';
import { Fade, Perspective } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

import { defaultFadeInVariants } from '~/constants/motions';

import BottomNavigation from '../BottomNavigation';
import QuestionHeader from '../QuestionHeader';
import PositionCard from './position/PositionCard';
import { type StepProps } from './type';

import '@egjs/react-flicking/dist/flicking.css';

type PositionCardProps = ComponentProps<typeof PositionCard>;

const IMAGE_BASE_URL = '/images/review/position';

const positionCards: PositionCardProps[] = [
  {
    title: 'PM',
    subTitle: '기획자',
    imgSrc: { default: `${IMAGE_BASE_URL}/pm.png`, webp: `${IMAGE_BASE_URL}/pm.webp` },
  },
  {
    title: 'Designer',
    subTitle: '디자이너',
    imgSrc: { default: `${IMAGE_BASE_URL}/design.png`, webp: `${IMAGE_BASE_URL}/design.webp` },
  },
  {
    title: 'Developer',
    subTitle: '개발자',
    imgSrc: { default: `${IMAGE_BASE_URL}/developer.png`, webp: `${IMAGE_BASE_URL}/developer.webp` },
  },
  {
    title: 'Others',
    subTitle: '지인',
    imgSrc: { default: `${IMAGE_BASE_URL}/others.png`, webp: `${IMAGE_BASE_URL}/others.webp` },
  },
];

interface Props extends StepProps {
  position?: string;
}

const Position = ({ prev, next }: Props) => {
  const plugins = [new Perspective({ rotate: 0.5, scale: 0.5 }), new Fade('', 1.1)];

  return (
    <>
      <QuestionHeader title="당신의 포지션을 알려주세요." />
      <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
        <Flicking align="center" circular plugins={plugins} css={positionWrapperCss}>
          {/* NOTE: @egjs/flicking 사용으로 인해 div로 한 번 더 감싸줌 */}
          {positionCards.map((position) => (
            <div key={position.title}>
              <PositionCard title={position.title} subTitle={position.subTitle} imgSrc={position.imgSrc} />
            </div>
          ))}
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
  overflow-x: hidden;
  width: 100vw;
`;
