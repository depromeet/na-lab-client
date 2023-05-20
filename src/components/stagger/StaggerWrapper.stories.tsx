import { useState } from 'react';
import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';
import { AnimatePresence } from 'framer-motion';

import { defaultFadeInVariants, staggerHalf } from '~/constants/motions';

import StaggerWrapper from './StaggerWrapper';

const meta: Meta<typeof StaggerWrapper> = {
  title: 'StaggerParagraph',
  component: StaggerWrapper,
};

export default meta;

export function Default() {
  return (
    <StaggerWrapper>
      <p>첫 번째 문장</p>
      <p>두 번째 문장</p>
      <p>세 번째 문장</p>
    </StaggerWrapper>
  );
}

export function Override() {
  return (
    <StaggerWrapper
      wrapperOverrideCss={css`
        flex-direction: row;
      `}
      staggerVariants={staggerHalf}
      paragraphVariants={defaultFadeInVariants}
    >
      <p
        css={css`
          color: red;
        `}
      >
        첫 번째 문장
      </p>
      <p>두 번째 문장</p>
      <p>세 번째 문장</p>
    </StaggerWrapper>
  );
}

export function WithAnimatePresence() {
  const [step, setStep] = useState(0);

  const prev = () => {
    if (step === 0) return;
    setStep((p) => p - 1);
  };

  const next = () => {
    if (step === 1) return;
    setStep((p) => p + 1);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <StaggerWrapper key={0}>
            <p>첫 번째 문장</p>
            <p>두 번째 문장</p>
            <p>세 번째 문장</p>
          </StaggerWrapper>
        )}

        {step === 1 && (
          <StaggerWrapper key={1}>
            <p>네 번째 문장</p>
            <p>다섯 번째 문장</p>
            <p>여섯 번째 문장</p>
          </StaggerWrapper>
        )}
      </AnimatePresence>

      <button type="button" onClick={prev}>
        prev
      </button>
      <button type="button" onClick={next}>
        next
      </button>
    </>
  );
}
