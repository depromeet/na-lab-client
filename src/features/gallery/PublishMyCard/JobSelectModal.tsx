import { useState } from 'react';
import Image from 'next/image';
import { css, type Theme, useTheme } from '@emotion/react';
import { m } from 'framer-motion';

import Button from '~/components/button/Button';
import XIcon from '~/components/icons/XIcon';
import Modal from '~/components/modal/Modal';
import { defaultFadeInVariants } from '~/constants/motions';
import Selection from '~/features/gallery/Selection';
import { BODY_1, HEAD_1 } from '~/styles/typo';

export type JobType = 'PM' | 'DEVELOPER' | 'DESIGNER' | 'OTHER';

const JOB_CHOICES: {
  label: string;
  value: JobType;
}[] = [
  {
    label: '기획자',
    value: 'PM',
  },
  {
    label: '개발자',
    value: 'DEVELOPER',
  },
  {
    label: '디자이너',
    value: 'DESIGNER',
  },
  {
    label: '기타',
    value: 'OTHER',
  },
];

interface Props {
  isShowing: boolean;
  onClose: () => void;

  onSubmit: (job: JobType) => void;
}

function JobSelectModal(props: Props) {
  const theme = useTheme();
  const [selected, setSelected] = useState<JobType>('PM');

  const onSubmit = () => {
    props.onSubmit(selected);
  };

  return (
    <Modal
      isShowing={props.isShowing}
      blurOverrideCss={css`
        background: rgb(0 0 0 / 50%);
        backdrop-filter: none;
      `}
      onClickOutside={props.onClose}
    >
      <m.article variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit" css={modalContentCss}>
        <header css={modalHeaderCss}>
          <h1>직무 선택</h1>
          <p>명함을 만들 직무를 선택하세요</p>
        </header>
        <div css={modalBodyCss}>
          {JOB_CHOICES.map((job) => (
            <Selection key={job.value} onChange={() => setSelected(job.value)} checked={selected === job.value}>
              {job.label}
            </Selection>
          ))}
        </div>
        <footer>
          <Button css={modalButtonCss} onClick={onSubmit}>
            선택 완료
          </Button>
        </footer>
        <Image
          css={uploadCardImageCss}
          src="/images/gallery/imgUploadCareerCard.png"
          alt="명함 게시하기"
          width={56}
          height={56}
        />
        <button type="button" css={closeButtonCss} onClick={props.onClose}>
          <XIcon color={theme.colors.gray_300} />
        </button>
      </m.article>
    </Modal>
  );
}

export default JobSelectModal;

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

const modalButtonCss = css`
  width: 167px;
  margin-inline: auto;
`;

const closeButtonCss = css`
  position: absolute;
  top: 0;
  right: 0;

  width: fit-content;
  padding: 10px;
`;
