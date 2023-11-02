/* eslint-disable unicorn/filename-case */
import { css } from '@emotion/react';
import { m } from 'framer-motion';

import Modal from '~/components/modal/Modal';
import { HEAD_2_BOLD } from '~/styles/typo';

const DNAImageDownloadModal = ({
  imageSrc,
  onClose,
  isShowing,
}: {
  imageSrc: string;
  onClose: () => void;
  isShowing: boolean;
}) => {
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

        <img src={imageSrc} alt="dna" />
      </m.div>
    </Modal>
  );
};

export default DNAImageDownloadModal;

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
    user-select: none;
  }

  img {
    user-select: none;
    width: 80%;
  }
`;
