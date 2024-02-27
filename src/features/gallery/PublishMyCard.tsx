import { useEffect, useState } from 'react';
import Image from 'next/image';
import { css, type Theme, useTheme } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';

import Button from '~/components/button/Button';
import XIcon from '~/components/icons/XIcon';
import Modal from '~/components/modal/Modal';
import Selection from '~/components/selection/Selection';
import { defaultFadeInVariants } from '~/constants/motions';
import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import { BODY_1, BODY_2_REGULAR, HEAD_1, HEAD_1_BOLD } from '~/styles/typo';

function PublishMyCard() {
  const theme = useTheme();

  const { isOpen, onClose } = useCardOpenState();
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen ? (
        <m.section css={containerCss} initial="initial" animate="animate" exit="exit" variants={defaultFadeInVariants}>
          <hgroup>
            <h2>수미 님</h2>
            <p>커리어 명함을 게시해보세요.</p>
          </hgroup>
          <Image
            css={imageCss}
            src="/images/gallery/imgUploadCareerCard.png"
            alt="명함 게시하기"
            width={56}
            height={56}
          />
          <Button css={buttonCss}>내 명함 게시하기</Button>
          <button type="button" css={closeButtonCss} onClick={onClose}>
            <XIcon color={theme.colors.gray_300} />
          </button>
        </m.section>
      ) : null}
      <JobSelectModal onClose={() => setIsModalOpen(false)} />
    </AnimatePresence>
  );
}

export default PublishMyCard;

const JOB_CHOICES = ['기획자', '디자이너', '개발자', '기타'] as const;

function JobSelectModal({ onClose }: { onClose: () => void }) {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState<(typeof JOB_CHOICES)[number]>('기획자');

  return (
    <Modal
      isShowing={true}
      blurOverrideCss={css`
        background: rgb(0 0 0 / 50%);
        backdrop-filter: none;
      `}
    >
      <article css={modalContentCss}>
        <header css={modalHeaderCss}>
          <h1>직무 선택</h1>
          <p>명함을 만들 직무를 선택하세요</p>
        </header>
        <div css={modalBodyCss}>
          {JOB_CHOICES.map((job) => (
            <Selection
              key={job}
              value={job}
              onChange={() => setIsSelected(job)}
              checked={isSelected === job}
              // onChange={onChange}
              // checked={selectedChoicesId.some((checkedChoiceId) => checkedChoiceId === choice_id)}
            >
              {job}
            </Selection>
          ))}
        </div>
        <Image
          css={uploadCardImageCss}
          src="/images/gallery/imgUploadCareerCard.png"
          alt="명함 게시하기"
          width={56}
          height={56}
        />
        <button type="button" css={closeButtonCss} onClick={onClose}>
          <XIcon color={theme.colors.gray_300} />
        </button>
      </article>
    </Modal>
  );
}

const modalContentCss = (theme: Theme) => css`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 25px;

  width: calc(100vw - 40px);
  max-width: 334px;
  padding: 42px 20px;

  background-color: ${theme.colors.white};
  border-radius: 20px;
`;

const uploadCardImageCss = css`
  position: absolute;
  top: 42px;
  right: 20px;
`;

const modalHeaderCss = (theme: Theme) => css`
  text-align: left;

  h1 {
    ${HEAD_1};
    color: ${theme.colors.black};
  }

  p {
    ${BODY_1};
    color: ${theme.colors.gray_400};
  }
`;

const modalBodyCss = css`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const useCardOpenState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    localStorage.setItem(LOCAL_STORAGE_KEY.galleryCardLead, 'true');
  };

  useEffect(() => {
    const isGalleryCardLead = localStorage.getItem(LOCAL_STORAGE_KEY.galleryCardLead);
    if (!isGalleryCardLead) {
      setIsOpen(true);
    }
  }, []);

  return { isOpen, onClose };
};

const buttonCss = css`
  ${BODY_2_REGULAR};
  width: calc(100% - 64px);
  height: 42px;
  margin: 0 34px;
`;

const containerCss = (theme: Theme) => css`
  position: relative;

  width: 100%;
  margin-top: 12px;
  padding: 49px 24px 24px;

  background-color: ${theme.colors.gray_50};
  border-radius: 20px;

  > hgroup {
    margin-bottom: 36px;

    h2 {
      ${HEAD_1_BOLD};
      color: ${theme.colors.black};
    }

    p {
      ${BODY_1};
      color: ${theme.colors.gray_400};
    }
  }
`;

const imageCss = css`
  position: absolute;
  top: 49px;
  right: 24px;
`;

const closeButtonCss = css`
  position: absolute;
  top: 0;
  right: 0;

  width: fit-content;
  padding: 10px;
`;
