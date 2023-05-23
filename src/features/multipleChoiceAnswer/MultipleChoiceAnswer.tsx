import { css } from '@emotion/react';

import colors from '~/styles/color';
import { BODY_2_BOLD } from '~/styles/typo';

const MultipleChoiceAnswer = ({ variant = 'highlighted', totalCount = 3, answeredCount = 1 }) => {
  return (
    <div css={ContainerCss(variant)}>
      <div css={PercentageBar(variant, totalCount, answeredCount)} />
      <div css={TextContainerCss(variant)}>
        <div css={[TextCss(variant)]}>UX가 좋습니다 졸려일무 무리무리무리루</div>
        {/* TODO 아이콘 변경 예정 */}
        <div css={[BODY_2_BOLD, CountTextCss(variant)]}>{answeredCount}명</div>
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

const ContainerCss = (variant: string) => css`
  position: relative;

  width: 329px;
  height: 48px;

  background-color: ${variant === 'default' ? colors.gray_50 : colors.primary_50};
  border-radius: 10px;
`;

const PercentageBar = (variant: string, totalCount: number, answeredCount: number) => css`
  position: absolute;

  width: ${(329 / totalCount) * answeredCount}px;
  height: 48px;

  background-color: ${variant === 'default' ? colors.secondary_100 : colors.primary_100};
  border-radius: ${totalCount === answeredCount ? '10px' : '10px 0 0 10px'};
`;

const TextContainerCss = (variant: string) => css`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 329px;
  height: 48px;

  color: ${variant === 'default' ? colors.gray_400 : colors.primary_200};
`;

const TextCss = (variant: string) => css`
  overflow: hidden;

  width: 210px;

  text-overflow: ellipsis;
  white-space: nowrap;

  background-color: transparent;

  z-index: 10;

  ${textStyles[variant]}
`;

const CountTextCss = (variant: string) => css`
  z-index: 10;
  color: ${variant === 'default' ? colors.gray_400 : colors.primary_200};
  background-color: transparent;
`;
