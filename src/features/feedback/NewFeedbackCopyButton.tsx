import { css, type Theme } from '@emotion/react';

import CopyLink from '~/components/copyLink/CopyLink';
import LinkIcon from '~/components/icons/LinkIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { HEAD_2_BOLD } from '~/styles/typo';

interface Props {
  surveyId: string;
}

const NewFeedbackCopyButton = ({ surveyId }: Props) => {
  const { fireToast } = useToast();

  const onCopyLink = () => {
    fireToast({
      content: (
        <>
          <LinkIcon />
          <Toast.Text>나의 질문 폼 링크가 복사되었어요</Toast.Text>
        </>
      ),
      higherThanCTA: true,
    });
  };

  return (
    <CopyLink copyText={`/review/${surveyId}`} onCopy={onCopyLink}>
      <button type="button" css={buttonCss}>
        <span css={titleCss}>나의 질문 폼 링크 공유하기</span>

        <span css={spanCss}>
          <LinkIcon fill="#677089" width={14} height={14} viewBox="0 0 24 24" />
          질문 폼 복사
        </span>
      </button>
    </CopyLink>
  );
};

export default NewFeedbackCopyButton;

const buttonCss = (theme: Theme) => css`
  cursor: pointer;

  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;

  width: calc(100% - 15px);
  height: 120px;
  padding-top: 24px;
  padding-left: 38px;

  background-color: ${theme.colors.white};
  border-radius: 0 8px 8px 0;
  box-shadow: 3px 1px 18px -2px #b0b7ca59;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    right: 0;

    display: block;

    width: 10px;
    height: 100%;

    background-color: #d8e3ff;
  }
`;

const titleCss = css`
  ${HEAD_2_BOLD}
`;

const spanCss = (theme: Theme) => css`
  display: flex;
  gap: 4px;
  align-items: center;

  padding: 7px 8px;

  color: ${theme.colors.gray_400};

  background-color: ${theme.colors.gray_50};
  border-radius: 7px;
`;
