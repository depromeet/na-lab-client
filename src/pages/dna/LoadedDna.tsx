/* eslint-disable @next/next/no-img-element */
import { type FC, useState } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { m } from 'framer-motion';

import { type Softskills } from '~/components/graphic/softskills/type';
import Header from '~/components/header/Header';
import DownloadCircleIcon from '~/components/icons/DownloadCircleIcon';
import HomeIcon from '~/components/icons/HomeIcon';
import Modal from '~/components/modal/Modal';
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
import { detectMobileDevice, getBrowser } from '~/utils/browser';
import { imageDownloadPC } from '~/utils/image';
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
  downloadableImageBase64: string;
}

const LoadedDna: FC<Props> = ({
  surveyId,
  group,
  dnaInfo,
  dnaOwnerStatus,
  userInfo,
  topTendencies,
  bookmarkedFeedbacks,
  downloadableImageBase64,
}) => {
  const router = useInternalRouter();

  const queryClient = useQueryClient();
  const { mutate } = usePatchPosition({
    onSuccess: () => queryClient.invalidateQueries(getUserInfoBySurveyIdQueryKey(surveyId)),
  });

  const [isImageModalShowing, setIsImageModalShowing] = useState(false);

  const onDownloadClick = async () => {
    const imageObj = JSON.parse(downloadableImageBase64);
    const imageBase64 = 'data:image/png;base64,' + imageObj.base64 ?? '';
    const browser = getBrowser();

    // TODO: share 갤러리에 저장 기능 되살리기
    // if (typeof navigator.share !== 'undefined') {
    //   const isImageShared = await imageShare(imageBase64);

    //   if (isImageShared) return;
    // }

    if (!detectMobileDevice() || browser === 'Safari') {
      imageDownloadPC(imageBase64, 'dna');

      return;
    }

    setIsImageModalShowing(true);
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
          {true && (
            <button type="button" css={downloadIconCss} onClick={onDownloadClick}>
              <DownloadCircleIcon />
            </button>
          )}
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

      <DNAImageDownloadModal
        downloadableImageBase64={downloadableImageBase64}
        isShowing={isImageModalShowing}
        onClose={() => setIsImageModalShowing(false)}
      />
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

const downloadIconCss = css`
  position: absolute;
  right: -2px;
  bottom: -5px;
`;

const DNAImageDownloadModal = ({
  downloadableImageBase64,
  onClose,
  isShowing,
}: {
  downloadableImageBase64: string;
  onClose: () => void;
  isShowing: boolean;
}) => {
  const imageObj = JSON.parse(downloadableImageBase64);
  const imageBase64 = 'data:image/png;base64,' + imageObj.base64 ?? '';

  return (
    <Modal isShowing={isShowing}>
      <Modal.Header onBackClick={onClose} overrideCss={imageDownloadModalHeaderCss} />
      <m.div
        css={imageDownloadModalCss}
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        }}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h1>꾹 눌러서 이미지를 저장하세요</h1>
        <m.img src={imageBase64} alt="dna" />
      </m.div>
    </Modal>
  );
};

const imageDownloadModalHeaderCss = css`
  background-color: transparent;
  border-bottom: none;
`;

const imageDownloadModalCss = css`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  h1 {
    ${HEAD_2_BOLD};
  }

  img {
    touch-action: none;
    width: 80%;
  }
`;
