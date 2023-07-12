import { type FC } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';
import { type Softskills } from '~/components/graphic/softskills/type';
import Header from '~/components/header/Header';
import HomeIcon from '~/components/icons/HomeIcon';
import useToast from '~/components/toast/useToast';
import { Tooltip } from '~/components/tooltip';
import { type DNA } from '~/constants/dna';
import DnaBanner from '~/features/dna/DnaBanner';
import TendencySection from '~/features/dna/TendencySection';
import Feedback from '~/features/feedback/Feedback';
import Input from '~/features/feedback/Input';
import usePatchPosition from '~/hooks/api/dna/usePatchPosition';
import type useGetUserInfoBySurveyId from '~/hooks/api/user/useGetUserInfoBySurveyId';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import { BODY_1, HEAD_2_BOLD } from '~/styles/typo';
import { copyToClipBoard } from '~/utils/clipboard';
import recordEvent from '~/utils/event';
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
  surveyId: string;
  group: Group;
  dnaInfo: DNA;
  dnaOwnerStatus: DnaOwnerStatus;
  userInfo: ReturnType<typeof useGetUserInfoBySurveyId>['data'];
  topTendencies: Softskills[];
  bookmarkedFeedbacks: QuestionFeedback[];
}

const LoadedDna: FC<Props> = ({
  surveyId,
  group,
  dnaInfo,
  dnaOwnerStatus,
  userInfo,
  topTendencies,
  bookmarkedFeedbacks,
}) => {
  const router = useInternalRouter();
  const { fireToast } = useToast();

  const { mutate } = usePatchPosition();

  const onClickCopyCTA = () => {
    recordEvent({ action: 'DNA 페이지 - 커리어 명함 링크 복사 클릭' });

    const hostUrl = window.location.host;
    const copyUrl = `${hostUrl}/dna/${surveyId}`;
    copyToClipBoard(copyUrl);
    fireToast({ content: `${userInfo?.nickname}님의 커리어 명함 링크가 복사되었어요`, higherThanCTA: true });
  };

  const onClickCareerCTA = () => {
    recordEvent({ action: 'DNA 페이지 - 나도 커리어 질문 폼 생성하기 클릭' });

    router.push('/survey');
  };

  return (
    <>
      {dnaOwnerStatus === 'current_user' ? (
        <Header title="나의 커리어 명함" isContainRemainer />
      ) : (
        <Header
          title={`${userInfo?.nickname} 님의 커리어 명함`}
          isContainRemainer
          backIcon={<HomeIcon />}
          onBackClick={() => router.push('/')}
        />
      )}

      <main css={wrapperCss}>
        <section css={imageWrapperCss}>
          <picture>
            <source srcSet={IMAGE_BY_GROUP[group].webp} type="image/webp" />
            <Image priority unoptimized css={dnaImageCss} src={IMAGE_BY_GROUP[group].png} alt="DNA 이미지" fill />
          </picture>
        </section>

        <section
          css={css`
            margin-bottom: 40px;
          `}
        >
          <div>
            <p css={titleCss}>{dnaInfo.title}를 가진</p>
            <Input onInputSubmit={(text) => mutate({ position: text })} value={userInfo?.position} />
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

          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
              margin-top: 16px;
            `}
          >
            {bookmarkedFeedbacks.map((feedback) => {
              if (feedback.type === 'short') {
                return feedback.feedbacks.map((item) => (
                  <Feedback
                    key={item.feedback_id}
                    form_question_feedback_id={item.form_question_feedback_id}
                    reply={item.reply}
                    is_read={item.is_read}
                    reviewer={item.reviewer}
                    is_bookmarked={item.bookmark.is_bookmarked}
                    isBookmarkable={dnaOwnerStatus === 'current_user' ? true : false}
                  />
                ));
              }
            })}
          </div>

          <div
            css={css`
              margin-top: 60px;
              margin-bottom: 20px;
            `}
          >
            {dnaOwnerStatus === 'current_user' ? (
              <CTAButton onClick={onClickCopyCTA}>공유하기</CTAButton>
            ) : (
              <Tooltip message="단 3분이면 나의 질문 폼 링크를 만들 수 있어요!" placement="top" offset={7}>
                <CTAButton color="blue" onClick={onClickCareerCTA}>
                  나도 커리어 질문 폼 공유하기
                </CTAButton>
              </Tooltip>
            )}
          </div>
        </section>
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
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 145%;
  color: ${theme.colors.black};
  letter-spacing: -0.3px;
`;

const ulCss = css`
  display: flex;
  flex-direction: column;
  gap: 4px;

  margin-top: 15px;

  list-style: disc inside;

  & li {
    ${BODY_1};

    padding-left: 30px;
    text-indent: -22px;
    list-style-position: inside;
  }
`;

const subTitleCss = css`
  ${HEAD_2_BOLD};

  color: var(--gray-500-text-secondary, #394258);
`;

const crewFeedbackContainer = css`
  transform: translateX(-23px);

  display: flex;
  flex-direction: column;

  width: calc(100% + 23px + 23px);
  padding-top: 20px;
  padding-right: 23px;
  padding-left: 23px;

  background: var(--gray-50-background-secondary, #f4f5f9);
`;
