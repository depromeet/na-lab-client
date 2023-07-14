import { type FC } from 'react';
import { css, type Theme } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';
import useToast from '~/components/toast/useToast';
import { Tooltip } from '~/components/tooltip';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import type useGetUserInfoBySurveyId from '~/hooks/api/user/useGetUserInfoBySurveyId';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import { type DnaOwnerStatus } from '~/pages/dna/type';
import { copyToClipBoard } from '~/utils/clipboard';
import recordEvent from '~/utils/event';

interface Props {
  surveyId: string;
  dnaOwnerStatus: DnaOwnerStatus;
  userInfo: ReturnType<typeof useGetUserInfoBySurveyId>['data'];
}

const DnaCta: FC<Props> = ({ surveyId, dnaOwnerStatus, userInfo }) => {
  const router = useInternalRouter();
  const { fireToast } = useToast();
  const { data: visitedUserSurveyId } = useGetSurveyIdByUserStatus();

  const onClickCopyCTA = () => {
    recordEvent({ action: 'DNA 페이지 - 커리어 명함 링크 복사 클릭' });

    const hostUrl = window.location.host;
    const copyUrl = `${hostUrl}/dna/${surveyId}`;
    copyToClipBoard(copyUrl);
    fireToast({ content: `${userInfo?.nickname}님의 커리어 명함 링크가 복사되었어요`, higherThanCTA: true });
  };

  const onClickMyResultCTA = () => {
    recordEvent({ action: 'DNA 페이지 - 내 결과 보러 가기 클릭' });

    router.push('/result');
  };

  const onClickCareerCTA = () => {
    recordEvent({ action: 'DNA 페이지 - 나도 커리어 질문 폼 생성하기 클릭' });

    router.push('/survey');
  };

  if (dnaOwnerStatus === 'current_user')
    return (
      <div css={wrapperCss}>
        <CTAButton onClick={onClickCopyCTA}>공유하기</CTAButton>
      </div>
    );

  if (Boolean(visitedUserSurveyId))
    return (
      <div css={fullGrayBackgroundWrapperCss}>
        <CTAButton onClick={onClickMyResultCTA}>내 결과 보러 가기</CTAButton>
      </div>
    );

  return (
    <div css={fullGrayBackgroundWrapperCss}>
      <Tooltip message="단 3분이면 나의 질문 폼 링크를 만들 수 있어요!" placement="top" offset={7}>
        <CTAButton color="blue" onClick={onClickCareerCTA}>
          나도 커리어 질문 폼 공유하기
        </CTAButton>
      </Tooltip>
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
  padding: 0 23px;

  width: 100%;
  max-width: ${theme.size.maxWidth};
`;

const fullGrayBackgroundWrapperCss = (theme: Theme) => css`
  transform: translateX(-23px);
  width: calc(100% + 23px + 23px);
  padding: 0 23px;
  padding-bottom: 12px;
  background-color: ${theme.colors.gray_50};
`;
