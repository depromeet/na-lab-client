import { type FC, type ReactElement } from 'react';
import { useSession } from 'next-auth/react';

import BottomBar from '~/components/bottomBar/BottomBar';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import SEO from '~/components/SEO/SEO';
import useToast from '~/components/toast/useToast';
import useGetFeedbackSummaryBySurveyId from '~/hooks/api/feedbacks/useGetFeedbackSummaryBySurveyId';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';

import SurveyIdLoaded from './SurveyIdLoaded';
import WhenEmptyFeedback from './WhenEmptyFeedback';

const Result = () => {
  const { isLoading, data } = useCheckSurveyId();

  return (
    <>
      <SEO />

      <LoadingHandler isLoading={isLoading} fallback={<FixedSpinner />}>
        {data && <FeedbackCountHandler surveyId={data.survey_id} />}
      </LoadingHandler>

      <BottomBar />
    </>
  );
};

export default Result;

Result.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

const useCheckSurveyId = () => {
  const { fireToast } = useToast();
  const router = useInternalRouter();
  const { status } = useSession();

  const { isLoading, data } = useGetSurveyIdByUserStatus({
    onError: () => {
      fireToast({ content: '문제가 발생했어요. 다시 시도해 주세요.' });
      router.push('/');
    },
  });

  useDidUpdate(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      fireToast({ content: '로그인 후 이용해 주세요.' });
      router.push('/');
    }
  }, [status]);

  return { isLoading, data };
};

interface FeedbackCountHandlerProps {
  surveyId: string;
}

const FeedbackCountHandler: FC<FeedbackCountHandlerProps> = ({ surveyId }) => {
  const { data, isLoading } = useGetFeedbackSummaryBySurveyId(surveyId);

  const isFeedbackEmpty = data && data.all_feedback_count === 0;

  return (
    <LoadingHandler isLoading={isLoading} fallback={<FixedSpinner />}>
      {isFeedbackEmpty ? <WhenEmptyFeedback surveyId={surveyId} /> : <SurveyIdLoaded surveyId={surveyId} />}
    </LoadingHandler>
  );
};
