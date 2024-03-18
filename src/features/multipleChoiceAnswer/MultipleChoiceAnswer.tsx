import { css, type Theme } from '@emotion/react';

import ProfileIcon from '~/components/icons/ProfileIcon';
import colors from '~/styles/color';
import { BODY_2_BOLD } from '~/styles/typo';

interface Props {
  variant?: 'highlighted' | 'default';
  totalCount: number;
  answeredCount: number;
  answerText: string;
}

const MultipleChoiceAnswer = ({ variant = 'default', totalCount, answeredCount, answerText }: Props) => {
  return (
    <div css={containerCss(variant)}>
      <div css={percentageBar(variant, totalCount === 0 ? 1 : totalCount, answeredCount ?? 1)} />
      <div css={textContainerCss(variant)}>
        <div css={(theme) => textCss(theme, variant)}>{answerText}</div>

        <div css={countContainerCss}>
          <ProfileIcon
            viewBox="0 0 30 30"
            width={20}
            height={20}
            color={variant === 'highlighted' ? '#638FFF' : '#677089'}
          />
          <span css={(theme) => countTextCss(theme, variant)}>{answeredCount}명</span>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceAnswer;

const textStyles: Record<string, Record<string, string>> = {
  default: {
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '150%',
    letterSpacing: '-0.3px',
  },
  highlighted: {
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '150%',
    letterSpacing: '-0.3px',
  },
};

const containerCss = (variant: string) => css`
  position: relative;

  width: 100%;
  height: 48px;

  background-color: ${variant === 'default' ? colors.gray_50 : colors.primary_50};
  border-radius: 8px;
`;

const percentageBar = (variant: string, totalCount: number, answeredCount: number) => css`
  position: absolute;

  width: calc(100% / ${totalCount} * ${answeredCount});
  height: 48px;

  background-color: ${variant === 'default' ? colors.secondary_100 : colors.primary_100};
  border-radius: ${totalCount === answeredCount ? '8px' : '8px 0 0 8px'};
`;

const textContainerCss = (variant: string) => css`
  display: flex;
  gap: 29px;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 48px;
  padding: 12px 14px;

  color: ${variant === 'default' ? colors.gray_400 : colors.primary_200};
`;

const countContainerCss = css`
  display: flex;
`;

const textCss = (theme: Theme, variant: string) => css`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;

  background-color: transparent;

  z-index: ${theme.zIndex.aboveDefault};

  ${textStyles[variant]}
`;

const countTextCss = (theme: Theme, variant: string) => css`
  ${BODY_2_BOLD}
  z-index: ${theme.zIndex.aboveDefault};
  color: ${variant === 'default' ? colors.gray_400 : colors.primary_200};
  background-color: transparent;
`;
