import { Children, type PropsWithChildren } from 'react';
import { css, type Interpolation, type Theme } from '@emotion/react';
import { m, type Variants } from 'framer-motion';

import { defaultFadeInUpVariants, stagger } from '~/constants/motions';
import { HEAD_1 } from '~/styles/typo';

interface Props extends PropsWithChildren {
  /**
   * @description wrapper에 적용될 css 입니다.
   * @default ```css
   *  display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    ```
   */
  wrapperOverrideCss?: Interpolation<Theme>;
  /**
   * @description wrapper에 적용될 variants 입니다.
   * @default stagger(0.5)
   */
  staggerVariants?: Variants;
  /**
   * @description paragraph에 적용될 variants 입니다.
   * @default defaultFadeInUpVariants
   */
  paragraphVariants?: Variants;
}

/**
 * @description children 노드 각각을 stagger가 적용된 div로 감싸 줍니다.
 */
const StaggerParagraph = ({
  children,
  wrapperOverrideCss,
  staggerVariants = stagger(0.5),
  paragraphVariants = defaultFadeInUpVariants,
}: Props) => {
  return (
    <m.article
      css={[wrapperCss, wrapperOverrideCss]}
      variants={staggerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {Children.toArray(children).map((paragraph, index) => (
        <m.div key={index} css={HEAD_1} variants={paragraphVariants}>
          {paragraph}
        </m.div>
      ))}
    </m.article>
  );
};

export default StaggerParagraph;

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;
