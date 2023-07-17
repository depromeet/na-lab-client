import { type FC } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';

import { type Softskills } from '~/components/graphic/softskills/type';
import Header from '~/components/header/Header';
import HomeIcon from '~/components/icons/HomeIcon';
import { type DNA } from '~/constants/dna';
import BookmarkSection from '~/features/dna/BookmarkSection';
import DnaBanner from '~/features/dna/DnaBanner';
import DnaCta from '~/features/dna/DnaCta';
import TendencySection from '~/features/dna/TendencySection';
import Input from '~/features/feedback/Input';
import usePatchPosition from '~/hooks/api/dna/usePatchPosition';
import type useGetUserInfoBySurveyId from '~/hooks/api/user/useGetUserInfoBySurveyId';
import { getUserInfoBySurveyIdQueryKey } from '~/hooks/api/user/useGetUserInfoBySurveyId';
import useInternalRouter from '~/hooks/router/useInternalRouter';
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

  const queryClient = useQueryClient();
  const { mutate } = usePatchPosition({
    onSuccess: () => queryClient.invalidateQueries(getUserInfoBySurveyIdQueryKey(surveyId)),
  });

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
            {dnaOwnerStatus === 'current_user' ? (
              <Input onInputSubmit={(text) => mutate({ position: text })} value={userInfo?.position} />
            ) : (
              <p css={titleCss}>{userInfo?.position}</p>
            )}
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

        <BookmarkSection bookmarkedFeedbacks={bookmarkedFeedbacks} dnaOwnerStatus={dnaOwnerStatus} />
        <DnaCta surveyId={surveyId} dnaOwnerStatus={dnaOwnerStatus} userInfo={userInfo} />
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
  padding-left: 1.5rem;

  list-style: disc;

  & li {
    ${BODY_1};
  }
`;

const subTitleCss = css`
  ${HEAD_2_BOLD};

  color: var(--gray-500-text-secondary, #394258);
`;
