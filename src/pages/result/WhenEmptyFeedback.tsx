import { type FC } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import BottomBar from '~/components/bottomBar/BottomBar';
import Button from '~/components/button/Button';
import CopyLink from '~/components/copyLink/CopyLink';
import MobileHeader from '~/components/header/MobileHeader';
import LinkIcon from '~/components/icons/LinkIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { HEAD_2_BOLD } from '~/styles/typo';

interface Props {
  surveyId: string;
}

const WhenEmptyFeeback: FC<Props> = ({ surveyId }) => {
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
    <>
      <main css={mainCss}>
        <MobileHeader title="연구 결과" hasMenu={false} />
        <Image css={imageCss} alt="빈 폴더" src="/images/result/empty.webp" width={212} height={162} />
        <span css={spanCss}>아직 도착한 피드백이 없어요</span>

        <CopyLink copyText={`/review/${surveyId}`} onCopy={onCopyLink}>
          <Button color="blue">질문 폼 공유하기</Button>
        </CopyLink>
      </main>
      <BottomBar />
    </>
  );
};

export default WhenEmptyFeeback;

const mainCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100dvh;
`;

const imageCss = css`
  margin-bottom: 30px;
`;

const spanCss = (theme: Theme) => css`
  ${HEAD_2_BOLD};
  margin-bottom: 32px;
  color: ${theme.colors.gray_400};
`;
