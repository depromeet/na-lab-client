import { type FC, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { css, type Theme } from '@emotion/react';

import BottomBar from '~/components/bottomBar/BottomBar';
import Button from '~/components/button/Button';
import MobileHeader from '~/components/header/MobileHeader';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import useGetFeedbackSummaryBySurveyId from '~/hooks/api/feedbacks/useGetFeedbackSummaryBySurveyId';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import { HEAD_2_BOLD } from '~/styles/typo';

const ResultBasePage: FC = () => {
  const { data, isLoading } = useGetSurveyIdByUserStatus();

  return (
    <LoadingHandler isLoading={isLoading} fallback={<FixedSpinner />}>
      {data && <WhenSurveyIdLoaded surveyId={data.survey_id} />}
    </LoadingHandler>
  );
};

export default ResultBasePage;

interface WhenSurveyIdLoadedProps {
  surveyId: string;
}

const WhenSurveyIdLoaded: FC<WhenSurveyIdLoadedProps> = ({ surveyId }) => {
  const router = useRouter();
  const { data } = useGetFeedbackSummaryBySurveyId(surveyId);

  useEffect(
    function replaceWhenHasFeedback() {
      if (!data) return;
      if (data.all_feedback_count > 0) router.replace('/result');
    },
    [data, router],
  );

  return (
    <>
      <main css={mainCss}>
        <MobileHeader title="연구 결과" hasMenu={false} />
        <Image css={imageCss} alt="빈 폴더" src="/images/result/empty.webp" width={212} height={162} />
        <span css={spanCss}>아직 도착한 피드백이 없어요</span>
        <Button color="blue">질문 폼 공유하기</Button>
      </main>
      <BottomBar />
    </>
  );
};

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
