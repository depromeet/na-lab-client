import { useState } from 'react';
import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';
import { AnimatePresence } from 'framer-motion';

import { defaultFadeInVariants, staggerHalf } from '~/constants/motions';

import StaggerParagraph from './StaggerParagraph';

const meta: Meta<typeof StaggerParagraph> = {
  title: 'StaggerParagraph',
  component: StaggerParagraph,
};

export default meta;

export function Default() {
  return (
    <StaggerParagraph>
      <p>첫 번째 문장</p>
      <p>두 번째 문장</p>
      <p>세 번째 문장</p>
    </StaggerParagraph>
  );
}

export function Override() {
  return (
    <StaggerParagraph
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
    </StaggerParagraph>
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
          <StaggerParagraph key={0}>
            <p>첫 번째 문장</p>
            <p>두 번째 문장</p>
            <p>세 번째 문장</p>
          </StaggerParagraph>
        )}

        {step === 1 && (
          <StaggerParagraph key={1}>
            <p>네 번째 문장</p>
            <p>다섯 번째 문장</p>
            <p>여섯 번째 문장</p>
          </StaggerParagraph>
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
