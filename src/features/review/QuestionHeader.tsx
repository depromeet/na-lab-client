import { css, type Theme } from '@emotion/react';
import { m, type Variants } from 'framer-motion';

import WatsonSmall from '~/components/watson/WatsonSmall';
import { defaultEasing, defaultFadeInVariants, stagger } from '~/constants/motions';
import { BODY_1, HEAD_1 } from '~/styles/typo';

interface Props {
  title: string;
  subTitle?: string;
}

const QuestionHeader = ({ title, subTitle }: Props) => {
  return (
    <m.header css={headerCss} variants={stagger(0.5)} initial="initial" animate="animate" exit="exit">
      <WatsonSmall />

      <m.h1 css={headingCss} variants={fadeInUpVariants}>
        {title}
      </m.h1>
      {subTitle && (
        <m.small css={smallCss} variants={defaultFadeInVariants}>
          {subTitle}
        </m.small>
      )}
    </m.header>
  );
};

export default QuestionHeader;

const headerCss = css`
  width: 100%;
  padding-top: 34px;
  padding-bottom: 18px;
`;

const headingCss = css`
  ${HEAD_1}

  margin-top: 12px;
  margin-bottom: 0;

  @supports (text-wrap: balance) {
    text-wrap: balance;
  }
`;

const smallCss = (theme: Theme) => css`
  ${BODY_1}

  margin-top: 8px;
  color: ${theme.colors.gray_500};
`;

const fadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
};
