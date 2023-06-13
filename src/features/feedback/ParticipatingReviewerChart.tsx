import React, { useLayoutEffect, useState } from 'react';
import { css, type Theme } from '@emotion/react';

import Svg from '~/components/svg/Svg';
import { POSITION } from '~/constants/position';
import { HEAD_2_REGULAR } from '~/styles/typo';

export interface Props {
  position: ReviewerPosition;
  amount: number;
}

type ColorByPosition = Record<ReviewerPosition, string>;

const FILL_COLOR_BY_POSITION: ColorByPosition = {
  pm: '#1D2942',
  designer: '#D8E3FF',
  developer: '#638FFF',
  others: '#F0F4FE',
};

const TEXT_COLOR_BY_POSITION: ColorByPosition = {
  pm: 'white',
  designer: '#677089',
  developer: 'white',
  others: '#677089',
};

const PieChart = ({ data }: { data: Props[] }) => {
  const centerX = 180;
  const centerY = 180;
  const radius = 180;
  let currentAngle = -Math.PI / 2;

  const totalAmount = data.reduce((acc, cur) => acc + cur.amount, 0);

  const amountToRatio = (amount: number) => {
    return amount / totalAmount;
  };

  const getPathCoordinates = (angle: number) => {
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return { x, y };
  };

  const renderSlice = (sliceData: Props, idx: number) => {
    const { amount, position } = sliceData;

    const sliceRatio = amountToRatio(amount);

    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceRatio * Math.PI * 1;

    const start = getPathCoordinates(startAngle);
    const end = getPathCoordinates(endAngle);

    const largeArcFlag = 0;

    const pathData = [
      `M ${centerX},${centerY}`,
      `L ${start.x},${start.y}`,
      `A ${radius},${radius} 0 ${largeArcFlag},1 ${end.x},${end.y}`,
      'Z',
    ].join(' ');

    //NOTE: @이상조 캡션의 정확한 위치값을 계산하기 힘들어 임의의 숫자 조합으로 어느정도 적절한 위치에 고정합니다.
    const captionAngle = (startAngle + endAngle) / 2;
    const captionX = centerX + radius * 0.78 * Math.cos(captionAngle);
    const captionY = centerY + 6 + radius * 0.78 * Math.sin(captionAngle);

    currentAngle = endAngle;

    return (
      <g key={idx}>
        <path d={pathData} fill={FILL_COLOR_BY_POSITION[position]} />
        {sliceRatio >= 0.1 && (
          <text x={captionX} y={captionY} textAnchor="middle" fill={TEXT_COLOR_BY_POSITION[position]} css={captionCss}>
            {`${Math.round(sliceRatio * 100)}%`}
          </text>
        )}
      </g>
    );
  };

  return (
    <Svg width={360} height={360} css={chartCss}>
      {data.map((sliceData, idx) => renderSlice(sliceData, idx))}
      <path d="M 180 80 A 100 100 0 0 1 180 280" fill="#F4F5F9" />
      <path d="M 180 105 A 75 75 0 0 1 180 255" fill="white" />
    </Svg>
  );
};

const chartCss = css`
  position: absolute;
  top: 0;
  left: -180px;
`;

const captionCss = css`
  font-size: 17.6566px;
  font-weight: 400;
  font-style: normal;
  line-height: 150%;
  letter-spacing: -0.33px;
`;

const PositionColorBadgeIcon = ({ position }: { position: ReviewerPosition }) => {
  return (
    <Svg width={14} height={14}>
      <circle cx="7" cy="7" r="7" fill={TEXT_COLOR_BY_POSITION[position]} />
    </Svg>
  );
};

const ChartDescription = ({ data }: { data: Props[] }) => {
  const [lineWidth, setLineWidth] = useState(0);

  useLayoutEffect(() => {
    const limittedInnerWidth = window.innerWidth > 480 ? 480 : window.innerWidth;
    setLineWidth(limittedInnerWidth * 0.224);
  }, []);

  return (
    <div css={descriptionContainerCss}>
      {data.map((sliceData, idx) => {
        return (
          <div key={idx} css={descriptionTextWrapperCss}>
            <span css={descriptionTextCss}>{POSITION[sliceData.position]}</span>
            <div css={descriptionDownsideWrapperCss}>
              <div css={(theme: Theme) => dashedLineCss(theme, lineWidth, idx)} />
              <div css={descriptionColorBadgeAmountWrapperCss}>
                <PositionColorBadgeIcon position={sliceData.position} />
                <span css={descriptionTextCss}>{sliceData.amount}명</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const descriptionContainerCss = css`
  position: absolute;
  top: 50%;
  right: 43px;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const descriptionTextWrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const descriptionDownsideWrapperCss = css`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const descriptionColorBadgeAmountWrapperCss = css`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const descriptionTextCss = ({ colors }: Theme) => css`
  ${HEAD_2_REGULAR};

  color: ${colors.gray_400};
`;

const dashedLineCss = ({ colors }: Theme, lineWidth: number, idx: number) => css`
  width: ${idx === 1 || idx === 2 ? lineWidth * 0.7 : lineWidth}px;
  height: 0;
  border: 1px dashed ${colors.gray_300};
`;

const ParticipatingReviewerChart = ({ data }: { data: Props[] }) => {
  return (
    <div css={containerCss}>
      <PieChart data={data} />
      <ChartDescription data={data} />
    </div>
  );
};

const containerCss = css`
  position: relative;
  height: 360px;
`;

export default ParticipatingReviewerChart;
