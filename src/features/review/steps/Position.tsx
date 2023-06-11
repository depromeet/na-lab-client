import { type ChangeEventHandler, type ComponentProps, type Dispatch, type SetStateAction } from 'react';
import { Fade, Perspective } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

import { defaultFadeInVariants } from '~/constants/motions';
import theme from '~/styles/theme';

import BottomNavigation from '../BottomNavigation';
import QuestionHeader from '../QuestionHeader';
import PositionCard from './position/PositionCard';
import { type StepProps } from './type';

import '@egjs/react-flicking/dist/flicking.css';

type PositionCardProps = Omit<ComponentProps<typeof PositionCard>, 'onChange' | 'checked'>;

const IMAGE_BASE_URL = '/images/review/position';

const positionCards: PositionCardProps[] = [
  {
    value: 'pm',
    title: 'PM',
    subTitle: '기획자',
    imgSrc: { default: `${IMAGE_BASE_URL}/pm.png`, webp: `${IMAGE_BASE_URL}/pm.webp` },
    checkedColor: theme.colors.yellowgreen_press,
    checkedBackgroundColor: theme.colors.yellowgreen,
  },
  {
    value: 'designer',
    title: 'Designer',
    subTitle: '디자이너',
    imgSrc: { default: `${IMAGE_BASE_URL}/designer.png`, webp: `${IMAGE_BASE_URL}/designer.webp` },
    checkedColor: theme.colors.pink_press,
    checkedBackgroundColor: theme.colors.pink,
  },
  {
    value: 'developer',
    title: 'Developer',
    subTitle: '개발자',
    imgSrc: { default: `${IMAGE_BASE_URL}/developer.png`, webp: `${IMAGE_BASE_URL}/developer.webp` },
    checkedColor: theme.colors.skyblue_press,
    checkedBackgroundColor: theme.colors.skyblue,
  },
  {
    value: 'others',
    title: 'Others',
    subTitle: '지인',
    imgSrc: { default: `${IMAGE_BASE_URL}/others.png`, webp: `${IMAGE_BASE_URL}/others.webp` },
    checkedColor: theme.colors.purple_press,
    checkedBackgroundColor: theme.colors.purple,
  },
];

interface Props extends StepProps {
  position: ReviewerPosition | null;
  setPosition: Dispatch<SetStateAction<ReviewerPosition | null>>;
}

const Position = ({ prev, next, position, setPosition }: Props) => {
  const plugins = [new Perspective({ rotate: 0.5, scale: 0.5 }), new Fade('', 1.1)];

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.checked) {
      setPosition(null);

      return;
    }

    const currentPosition = e.target.value as ReviewerPosition;
    setPosition(currentPosition);
  };

  return (
    <>
      <QuestionHeader title="당신의 포지션을 알려주세요." />
      <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
        <Flicking align="center" circular plugins={plugins} css={positionWrapperCss}>
          {/* NOTE: @egjs/flicking 사용으로 인해 div로 한 번 더 감싸줌 */}
          {positionCards.map((eachPosition) => (
            <div key={eachPosition.title}>
              <PositionCard
                title={eachPosition.title}
                subTitle={eachPosition.subTitle}
                imgSrc={eachPosition.imgSrc}
                value={eachPosition.value}
                checked={position === eachPosition.value}
                onChange={onChange}
                checkedColor={eachPosition.checkedColor}
                checkedBackgroundColor={eachPosition.checkedBackgroundColor}
              />
            </div>
          ))}
        </Flicking>
      </m.section>
      <BottomNavigation onBackClick={prev} isNextDisabled={position === null} onNextClick={next} />
    </>
  );
};

export default Position;

const sectionCss = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;

  height: 100%;
`;

const positionWrapperCss = css`
  /* NOTE: flicking 기본 스타일 오버라이드 */
  position: fixed !important;
  left: 0;

  overflow-x: hidden;

  width: 100dvw;
  padding: 30px 0;
`;
