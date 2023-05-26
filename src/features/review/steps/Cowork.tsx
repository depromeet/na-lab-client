import { type ChangeEventHandler, type Dispatch, type SetStateAction } from 'react';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import { defaultFadeInVariants } from '~/constants/motions';
import { HEAD_2_BOLD, HEAD_2_REGULAR } from '~/styles/typo';

import BottomNavigation from '../BottomNavigation';
import QuestionHeader from '../QuestionHeader';
import { type StepProps } from './type';

// TODO: API 개발 이후 수정
const MOCK_NAME = '예진';

const RADIO_NAME = 'isCowork';

interface Props extends StepProps {
  isCoworked: boolean | null;
  setIsCoworked: Dispatch<SetStateAction<boolean | null>>;
}

const Cowork = ({ prev, next, isCoworked, setIsCoworked }: Props) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsCoworked(Boolean(e.target.value));
  };

  return (
    <>
      <QuestionHeader title={`당신은 ${MOCK_NAME}님과 협업한 경험이 있나요?`} />

      <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
        <div css={outerCircleCss}>
          <m.div css={innerCircleCss(isCoworked)}>
            <label css={[inputLabelCss, yesLabelCss]}>
              <input type="radio" name={RADIO_NAME} value="yes" onChange={onChange} />
              <span>네, 있어요</span>
            </label>

            <label css={[inputLabelCss, noLabelCss]}>
              <input type="radio" name={RADIO_NAME} value="" onChange={onChange} />
              <span>없어요</span>
            </label>
          </m.div>
        </div>
      </m.section>

      <BottomNavigation isBackDisabled onBackClick={prev} isNextDisabled={isCoworked === null} onNextClick={next} />
    </>
  );
};

export default Cowork;

const sectionCss = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const outerCircleCss = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 310px;
  height: 310px;

  background-color: #fafbff;
  border-radius: 50%;
  box-shadow: inset 0 0 27.3653px -6.8413px rgb(205 216 242 / 50%);
`;

type IsCoworked = boolean | null;

const innerCircleCss = (isCoworked: IsCoworked) => css`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 166px;
  height: 166px;

  background-clip: content-box, border-box;
  background-origin: border-box;
  border: 2px solid transparent;
  border-radius: 50%;

  ${isCoworked === null && defaultCss};
  ${isCoworked === true && isCoworkedCss};
  ${isCoworked === false && notCoworkedCss};
`;

const defaultCss = css`
  background-image: linear-gradient(#fafbff, #fafbff), linear-gradient(270deg, #638fff 0.2%, rgb(49 206 255 / 55%) 100%);
`;

const isCoworkedCss = css`
  background-image: linear-gradient(#fafbff, #fafbff), linear-gradient(180deg, #638fff 0.2%, rgb(49 206 255 / 55%) 100%);
  box-shadow: 0 0 20.524px -14.8229px #415e9c;
`;

const notCoworkedCss = css`
  background-image: linear-gradient(#fafbff, #fafbff), linear-gradient(180deg, #1d2942 0.2%, #9eb9ff 100%);
  box-shadow: 0 0 20.524px -14.8229px #415e9c;
`;

const inputLabelCss = (theme: Theme) => css`
  ${HEAD_2_REGULAR}

  cursor: pointer;
  position: absolute;

  & > input {
    display: none;
    appearance: none;
  }

  & > span {
    padding: 7px 13px;

    color: ${theme.colors.gray_400};

    background-color: ${theme.colors.white};
    border-radius: 24px;
    box-shadow: 0 0 11px -18px red;

    transition: background-color 0.3s ${theme.transition.defaultEasing}, color 0.3s ${theme.transition.defaultEasing};
  }
`;

const yesLabelCss = (theme: Theme) => css`
  top: -7px;

  & > input:checked + span {
    ${HEAD_2_BOLD}

    color: ${theme.colors.white};
    background-color: ${theme.colors.primary_200};
  }
`;

const noLabelCss = (theme: Theme) => css`
  bottom: -7px;

  & > input:checked + span {
    ${HEAD_2_BOLD}

    color: ${theme.colors.white};
    background-color: ${theme.colors.gray_500};
  }
`;
