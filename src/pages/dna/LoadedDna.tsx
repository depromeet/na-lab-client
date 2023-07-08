import { type FC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';
import Softskill from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';
import Header from '~/components/header/Header';
import Pill from '~/components/pill/Pill';
import DnaBanner from '~/features/dna/DnaBanner';
import Feedback from '~/features/feedback/Feedback';
import type useGetUserInfoBySurveyId from '~/hooks/api/user/useGetUserInfoBySurveyId';

interface Props {
  userInfo: ReturnType<typeof useGetUserInfoBySurveyId>['data'];
  topTendencies: Softskills[];
}

const LoadedDna: FC<Props> = ({ userInfo, topTendencies }) => {
  console.warn(userInfo, topTendencies);

  return (
    <>
      <Header title="나의 커리어 명함" isContainRemainer />

      <main css={wrapperCss}>
        <section>
          <Image css={dnaImageCss} src="/images/result/dna.png" alt="DNA 이미지" width={329} height={405} />
        </section>

        {/* 
       // TODO 상조갓의 인풋 컴포넌트 + 수미갓의 데이터로 대체
        */}
        <section>
          <div css={titleCss}>굴하지 않는 개척자 DNA를 가진 UXUI 디자이너</div>
          <ul>
            <li css={myInfoListCss}>어딜가서나 자연스럽게 리더의 역할을 맡아요.</li>
            <li css={myInfoListCss}>높은 결단력으로 빠르게 공동의 방향을 제시해요.</li>
            <li css={myInfoListCss}>강한 책임감과 뛰어난 실행력으로 프로젝트를 관리하며 팀원들의 신뢰를 얻어요.</li>
          </ul>
        </section>

        <section css={dnaSectionCss}>
          <div css={dnaSubTitleCss}>동료들이 고른 유나 님의 이미지</div>
          <div css={pillContainer}>
            <Pill size={'medium'} color={'bluegreen'}>
              <Softskill name="논리적인" />
              {'논리적인'}
            </Pill>
            <Pill size={'medium'} color={'bluegreen'}>
              <Softskill name="논리적인" />
              {'논리적인'}
            </Pill>
            <Pill size={'medium'} color={'bluegreen'}>
              <Softskill name="논리적인" />
              {'논리적인'}
            </Pill>
            <Pill size={'medium'} color={'bluegreen'}>
              <Softskill name="논리적인" />
              {'논리적인'}
            </Pill>
            <Pill size={'medium'} color={'bluegreen'}>
              <Softskill name="논리적인" />
              {'논리적인'}
            </Pill>
          </div>

          <section css={dnaSectionCss}>
            <div css={dnaSubTitleCss}>나와 잘맞는 DNA</div>
            <DnaBanner />
          </section>

          <section css={crewFeedbackContainer}>
            <div css={dnaSubTitleCss}>동료들의 평가</div>
            <Feedback
              reply={['좋아요 죻아요 좋습니다']}
              is_read={true}
              reviewer={{ nickname: '오연', collaboration_experience: true, position: 'designer' }}
            />
          </section>

          <CTAButton>공유하기</CTAButton>
        </section>
      </main>
    </>
  );
};

export default LoadedDna;

const wrapperCss = css`
  width: 100%;
`;

const dnaImageCss = css`
  border: 1px solid gray;
  border-radius: 8px;
`;

const titleCss = css`
  height: 74px;
  margin: 24px 16px 0;

  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  line-height: 154%;
  color: #17171b;
  letter-spacing: -0.3px;
`;

const dnaSubTitleCss = css`
  margin-top: 16px;

  font-size: 18px;
  font-weight: 600;
  font-style: normal;
  line-height: 140%;
  color: var(--gray-500-text-secondary, #394258);
  letter-spacing: -0.3px;
`;

const dnaSectionCss = css`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;

  margin: 40px 16px 0;
`;

const myInfoListCss = css`
  margin: 2px 0;

  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: var(--gray-500-text-secondary, #394258);
  letter-spacing: -0.3px;
`;

const pillContainer = css`
  display: flex;
  flex-wrap: wrap;
  row-gap: 11px;
  column-gap: 10px;

  margin-top: 16px;

  white-space: pre-wrap;
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
