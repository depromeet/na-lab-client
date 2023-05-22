import { css, type Theme, useTheme } from '@emotion/react';

import { BODY_2_BOLD } from '~/styles/typo';

interface Props {
  currentStep: number;
  stepLength: number;
}

const StepStatus = ({ currentStep, stepLength }: Props) => {
  const theme = useTheme();

  const percentage = (currentStep / stepLength) * 100;

  return (
    <div css={wrapperCss}>
      <div css={stepBackgroundCss}>
        <div css={stepBarCss(theme, percentage)} />
      </div>

      <span css={statusCss}>
        {currentStep}/{stepLength}
      </span>
    </div>
  );
};

export default StepStatus;

const wrapperCss = (theme: Theme) => css`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  margin: 0 auto;
`;

const stepBackgroundCss = (theme: Theme) => css`
  position: relative;
  width: 100%;
  height: 6px;
  background-color: ${theme.colors.gray_50};
`;

const stepBarCss = (theme: Theme, widthPercentage: number) => css`
  position: absolute;
  top: 0;
  left: 0;

  width: ${widthPercentage}%;
  height: 100%;

  background-color: ${theme.colors.primary_200};

  transition: width 0.2s ${theme.transition.defaultEasing};
`;

const statusCss = (theme: Theme) => css`
  ${BODY_2_BOLD}

  position: absolute;
  top: 14px;
  right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 54px;
  height: 40px;

  font-weight: 600;
  color: ${theme.colors.gray_500};

  background-color: ${theme.colors.gray_50};
  border-radius: 24px;
`;
