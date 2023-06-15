import Image from 'next/image';
import Link from 'next/link';
import { css, type Theme, useTheme } from '@emotion/react';

import ChevronArrowRightIcon from '~/components/icons/ChevronArrowRightIcon';
import { BODY_1, HEAD_2_BOLD } from '~/styles/typo';

interface Props {
  newFeedbackNumber: number;
}

const ResearchMoveAnchor = ({ newFeedbackNumber }: Props) => {
  const theme = useTheme();

  // TODO: link 위치 조정 필요
  return (
    <Link href="/" type="button" css={[HEAD_2_BOLD, containerCss(theme)]}>
      <section css={leftBoxCss}>
        <div css={textWrapperCss(theme)}>
          <span css={HEAD_2_BOLD}>쌓인 연구 일지 보러가기</span>
          <ChevronArrowRightIcon width={24} height={24} viewBox="0 0 8 14" css={chevronArrowRightIconCss} />
        </div>
        <div css={[BODY_1, unreadMsgCountBadge(theme)]}>+{newFeedbackNumber}</div>
      </section>
      <Image css={fileImageCss} src="/images/files.png" alt="파일 이미지" width={93} height={70} />
      <aside css={rightMarkCss(theme)} />
    </Link>
  );
};

export default ResearchMoveAnchor;

const containerCss = (theme: Theme) => css`
  all: unset;

  position: relative;

  display: flex;

  width: calc(100% - 15px);
  height: 120px;
  padding-top: 24px;
  padding-left: 38px;

  background-color: ${theme.colors.white};
  border-radius: 0 8px 8px 0;
  box-shadow: 3px 1px 18px -2px #b0b7ca59;
`;

const leftBoxCss = css`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const textWrapperCss = (theme: Theme) => css`
  display: flex;
  gap: 2px;
  align-items: center;
  color: ${theme.colors.gray_500};
`;

const chevronArrowRightIconCss = css`
  padding: 5px 8px;
`;

const unreadMsgCountBadge = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  padding: 0 8px;

  color: ${theme.colors.gray_50};

  background-color: ${theme.colors.red};
  border-radius: 12px;
`;

const fileImageCss = css`
  position: absolute;
  right: 22px;
  bottom: 0;
`;

const rightMarkCss = (theme: Theme) => css`
  position: absolute;
  top: 0;
  right: 0;

  width: 10px;
  height: 100%;

  background-color: ${theme.colors.secondary_200};
  border-radius: 0 8px 8px 0;
`;
