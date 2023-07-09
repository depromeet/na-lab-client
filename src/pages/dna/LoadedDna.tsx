import { type FC } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';
import { type Softskills } from '~/components/graphic/softskills/type';
import Header from '~/components/header/Header';
import { type DNA } from '~/constants/dna';
import DnaBanner from '~/features/dna/DnaBanner';
import TendencySection from '~/features/dna/TendencySection';
import Feedback from '~/features/feedback/Feedback';
import type useGetUserInfoBySurveyId from '~/hooks/api/user/useGetUserInfoBySurveyId';
import { BODY_1, HEAD_2_BOLD } from '~/styles/typo';
import { type Group } from '~/utils/resultLogic';

import { type DnaOwnerStatus } from './type';

interface Image {
  webp: string;
  png: string;
}
const IMAGE_BASE_URL = '/images/dna/result';
const IMAGE_BY_GROUP: Record<Group, Image> = {
  A: { webp: `${IMAGE_BASE_URL}/A_dna.webp`, png: `${IMAGE_BASE_URL}/A_dna.png` },
  B: { webp: `${IMAGE_BASE_URL}/B_dna.webp`, png: `${IMAGE_BASE_URL}/B_dna.png` },
  C: { webp: `${IMAGE_BASE_URL}/C_dna.webp`, png: `${IMAGE_BASE_URL}/C_dna.png` },
  D: { webp: `${IMAGE_BASE_URL}/D_dna.webp`, png: `${IMAGE_BASE_URL}/D_dna.png` },
  E: { webp: `${IMAGE_BASE_URL}/E_dna.webp`, png: `${IMAGE_BASE_URL}/E_dna.png` },
  F: { webp: `${IMAGE_BASE_URL}/F_dna.webp`, png: `${IMAGE_BASE_URL}/F_dna.png` },
} as const;

interface Props {
  group: Group;
  dnaInfo: DNA;
  dnaOwnerStatus: DnaOwnerStatus;
  userInfo: ReturnType<typeof useGetUserInfoBySurveyId>['data'];
  topTendencies: Softskills[];
}

const LoadedDna: FC<Props> = ({ group, dnaInfo, dnaOwnerStatus, userInfo, topTendencies }) => {
  console.warn(userInfo, topTendencies, dnaOwnerStatus);

  return (
    <>
      <Header title="나의 커리어 명함" isContainRemainer />

      <main css={wrapperCss}>
        <section css={imageWrapperCss}>
          <picture>
            <source srcSet={IMAGE_BY_GROUP[group].webp} type="image/webp" />
            <Image priority unoptimized css={dnaImageCss} src={IMAGE_BY_GROUP[group].png} alt="DNA 이미지" fill />
          </picture>
        </section>

        {/* 
       // TODO 상조갓의 인풋 컴포넌트 + 수미갓의 데이터로 대체
        */}
        <section
          css={css`
            margin-bottom: 40px;
          `}
        >
          <div>
            <p css={titleCss}>{dnaInfo.title}를 가진</p>
            <p css={titleCss}>UXUI 디자이너</p>
          </div>

          <ul css={ulCss}>
            {dnaInfo.descriptions.map((desc) => (
              <li key={desc}>{desc}</li>
            ))}
          </ul>
        </section>

        <TendencySection userInfo={userInfo} topTendencies={topTendencies} />

        <section
          css={css`
            margin-bottom: 48px;
          `}
        >
          <p
            css={[
              subTitleCss,
              css`
                margin-bottom: 16px;
              `,
            ]}
          >
            나와 잘맞는 DNA
          </p>
          <DnaBanner title={dnaInfo.fitDna.title} desc={dnaInfo.fitDna.subtitle} />
        </section>

        <section css={crewFeedbackContainer}>
          <p css={subTitleCss}>동료들의 평가</p>
          <Feedback
            reply={['좋아요 죻아요 좋습니다']}
            is_read={true}
            reviewer={{ nickname: '오연', collaboration_experience: true, position: 'designer' }}
          />
        </section>

        <CTAButton>공유하기</CTAButton>
      </main>
    </>
  );
};

export default LoadedDna;

const wrapperCss = css`
  width: 100%;
`;

const imageWrapperCss = css`
  position: relative;

  overflow: hidden;

  aspect-ratio: 329 / 389;
  width: 100%;
  margin-bottom: 24px;

  border-radius: 4px;
`;

const dnaImageCss = css`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const titleCss = (theme: Theme) => css`
  font-size: 24px;
  font-weight: 700;
  line-height: 154%;
  color: ${theme.colors.black};
`;

const ulCss = css`
  display: flex;
  flex-direction: column;
  gap: 4px;

  margin-top: 15px;

  list-style: disc inside;

  & li {
    ${BODY_1};
  }
`;

const subTitleCss = css`
  ${HEAD_2_BOLD};

  color: var(--gray-500-text-secondary, #394258);
`;

const crewFeedbackContainer = css`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;

  width: 100%;
  padding: 10px;

  background: var(--gray-50-background-secondary, #f4f5f9);
`;
