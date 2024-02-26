import { useEffect, useState } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { AnimatePresence, m } from 'framer-motion';

import Button from '~/components/button/Button';
import XIcon from '~/components/icons/XIcon';
import { defaultFadeInVariants } from '~/constants/motions';
import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import { BODY_1, BODY_2_REGULAR, HEAD_1_BOLD } from '~/styles/typo';

function PublishMyCard() {
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
            <XIcon color="#C9CFDF" />
          </button>
        </m.section>
      ) : null}
    </AnimatePresence>
  );
}

export default PublishMyCard;

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
