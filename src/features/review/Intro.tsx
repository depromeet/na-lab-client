import { css } from '@emotion/react';
import { m } from 'framer-motion';

import { defaultFadeInVariants } from '~/constants/motions';

const Intro = () => {
  return (
    <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
      1
    </m.section>
  );
};

export default Intro;

const sectionCss = css`
  background-color: blue;
`;
