import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';

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
