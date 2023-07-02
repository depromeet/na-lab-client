import { Children, type PropsWithChildren, useEffect } from 'react';
import { css, type Interpolation, type Theme } from '@emotion/react';
import { m, stagger, useAnimate, type Variants } from 'framer-motion';

import { defaultEasing } from '~/constants/motions';
import useDidMount from '~/hooks/lifeCycle/useDidMount';
import { HEAD_1 } from '~/styles/typo';

interface SkipStaggerWrapperProps extends PropsWithChildren {
  onSkip: () => void;
  wrapperOverrideCss?: Interpolation<Theme>;
  staggerDelay?: number;
  paragraphVariants?: Variants;
}

const SkipStaggerWrapper = ({
  children,
  onSkip,
  wrapperOverrideCss,
  staggerDelay = 0.5,
  paragraphVariants = fadeInUpVariants,
}: SkipStaggerWrapperProps) => {
  const [scope, animate] = useAnimate();

  const onClick = async () => {
    if (!scope.current) return;

    await animate('div', { opacity: 1, scale: 1, y: [1, 0] }, { duration: 0.1 });
    setTimeout(onSkip, staggerDelay * 1000);
  };

  useEffect(() => {
    animate('div', { opacity: 1, scale: 1, y: [10, 0] }, { duration: staggerDelay, delay: stagger(staggerDelay) });
  }, [animate, staggerDelay]);

  useDidMount(() => {
    if (document) {
      document.body.addEventListener('click', onClick);
    }

    return () => {
      if (document) {
        document.body.removeEventListener('click', onClick);
      }
    };
  });

  return (
    <m.article ref={scope} css={[wrapperCss, wrapperOverrideCss]}>
      {Children.toArray(children).map((paragraph, index) => (
        <m.div key={index} css={HEAD_1} variants={paragraphVariants}>
          {paragraph}
        </m.div>
      ))}
    </m.article>
  );
};

export default SkipStaggerWrapper;

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
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
