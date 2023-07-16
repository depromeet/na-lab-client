import { type FC } from 'react';
import { useRouter } from 'next/router';
import { css, type Theme } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';
import useToast from '~/components/toast/useToast';
import type useGetUserInfoBySurveyId from '~/hooks/api/user/useGetUserInfoBySurveyId';
import { type DnaOwnerStatus } from '~/pages/dna/type';
import { copyToClipBoardWithHost } from '~/utils/clipboard';
import recordEvent from '~/utils/event';

interface Props {
  surveyId: string;
  dnaOwnerStatus: DnaOwnerStatus;
  userInfo: ReturnType<typeof useGetUserInfoBySurveyId>['data'];
}

const DnaCta: FC<Props> = ({ surveyId, dnaOwnerStatus, userInfo }) => {
  const router = useRouter();
  const { fireToast } = useToast();

  const onClickCopyCTA = () => {
    recordEvent({ action: 'DNA 페이지 - 커리어 명함 링크 복사 클릭' });

    copyToClipBoardWithHost(`/dna/${surveyId}`);
    fireToast({ content: `${userInfo?.nickname}님의 커리어 명함 링크가 복사되었어요`, higherThanCTA: true });
  };

  const onClickFeedbackCTA = () => {
    recordEvent({ action: 'DNA 페이지 - 나도 피드백 남기기 클릭' });

    router.push(`/review/${surveyId}`);
  };

  if (dnaOwnerStatus === 'current_user')
    return (
      <div css={wrapperCss}>
        <CTAButton onClick={onClickCopyCTA}>공유하기</CTAButton>
      </div>
    );

  return (
    <div css={fullGrayBackgroundWrapperCss}>
      <CTAButton color="blue" onClick={onClickFeedbackCTA}>
        나도 피드백 남기기
      </CTAButton>
    </div>
  );
};

export default DnaCta;

const wrapperCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.fixed};
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  padding: 0 23px;
`;

const fullGrayBackgroundWrapperCss = (theme: Theme) => css`
  transform: translateX(-23px);

  width: calc(100% + 23px + 23px);
  padding: 0 23px;
  padding-bottom: 12px;

  background-color: ${theme.colors.gray_50};
`;
