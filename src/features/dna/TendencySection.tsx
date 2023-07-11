import { type FC } from 'react';
import { css, type Theme } from '@emotion/react';

import Softskill from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';
import Pill, { type Color } from '~/components/pill/Pill';
import type useGetUserInfoBySurveyId from '~/hooks/api/user/useGetUserInfoBySurveyId';
import { HEAD_2_BOLD } from '~/styles/typo';

interface Props {
  userInfo: ReturnType<typeof useGetUserInfoBySurveyId>['data'];
  topTendencies: Softskills[];
}

const TendencySection: FC<Props> = ({ userInfo, topTendencies }) => {
  return (
    <section
      css={css`
        margin-bottom: 40px;
      `}
    >
      <p css={subTitleCss}>동료들이 고른 {userInfo?.nickname} 님의 이미지</p>
      <div css={pillContainer}>
        {topTendencies.map((tendency, index) => (
          <Pill key={tendency} color={COLOR_INDEX[index]}>
            <Softskill name={tendency} /> {tendency}
          </Pill>
        ))}
      </div>
    </section>
  );
};

export default TendencySection;

const subTitleCss = (theme: Theme) => css`
  ${HEAD_2_BOLD};

  color: ${theme.colors.gray_500};
`;

const pillContainer = css`
  display: flex;
  flex-wrap: wrap;
  row-gap: 11px;
  column-gap: 10px;

  margin-top: 16px;

  white-space: pre-wrap;
`;

const COLOR_INDEX: Color[] = ['bluegreen', 'pink', 'skyblue', 'yellowgreen', 'purple'];
