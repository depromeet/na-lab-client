import { type ButtonHTMLAttributes } from 'react';
import { css, type Theme, useTheme } from '@emotion/react';
import { type HTMLMotionProps, m } from 'framer-motion';

import ChevronArrowRightIcon from '~/components/icons/ChevronArrowRightIcon';
import { defaultFadeInUpVariants } from '~/constants/motions';
import { HEAD_3_SEMIBOLD } from '~/styles/typo';

const SubmitButton = ({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & HTMLMotionProps<'button'>) => {
  const theme = useTheme();

  return (
    <m.button
      type="button"
      css={buttonCss}
      variants={defaultFadeInUpVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      {...rest}
    >
      {children}
      <ChevronArrowRightIcon color={theme.colors.gray_400} />
    </m.button>
  );
};

export default SubmitButton;

const buttonCss = (theme: Theme) => css`
  ${HEAD_3_SEMIBOLD};
  position: fixed;
  bottom: 72px;

  display: flex;
  gap: 8px;
  align-items: center;
  align-self: flex-end;
  justify-content: center;

  padding: 8px 16px;

  color: ${theme.colors.white};

  background-color: ${theme.colors.secondary_200};
  border-radius: 72px;
`;
