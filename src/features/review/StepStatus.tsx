import { css, type Theme, useTheme } from '@emotion/react';

import { BODY_2_BOLD } from '~/styles/typo';

interface Props {
  /**
   * @description 현재 진행중인 스텝
   */
  currentStep: number;
  /**
   * @description 제외할 스텝이 포함된 총 스텝의 길이
   */
  stepLength: number;
  /**
   * @description 제외할 스텝의 index
   */
  notContainSteps: number[];
}

const StepStatus = ({ currentStep, stepLength, notContainSteps }: Props) => {
  const theme = useTheme();

  const { percentage, calculatedCurrentStep, calculatedLength, isCurrentDisabled } = useStepStatus({
    currentStep,
    stepLength,
    notContainSteps,
  });

  return (
    <div css={wrapperCss(theme, isCurrentDisabled)}>
      <div css={stepBackgroundCss}>
        <div css={stepBarCss(theme, percentage)} />
      </div>

      <span css={statusCss}>
        {calculatedCurrentStep}/{calculatedLength}
      </span>
    </div>
  );
};

export default StepStatus;

const useStepStatus = ({ currentStep, stepLength, notContainSteps }: Props) => {
  const calculatedCurrentStep = currentStep - notContainSteps.filter((step) => step < currentStep).length + 1;
  const calculatedLength = stepLength - notContainSteps.length;

  const percentage = (calculatedCurrentStep / calculatedLength) * 100;

  const isCurrentDisabled = notContainSteps.includes(currentStep);

  return { percentage, calculatedCurrentStep, calculatedLength, isCurrentDisabled };
};

const wrapperCss = (theme: Theme, isCurrentDisabled: boolean) => css`
  position: fixed;
  z-index: ${theme.zIndex.fixed};
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  margin: 0 auto;

  opacity: ${isCurrentDisabled ? 0 : 1};

  transition: opacity 0.3s ${theme.transition.defaultEasing};
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
