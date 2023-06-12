import { type ReactElement } from 'react';
import { useSession } from 'next-auth/react';

import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import useToast from '~/components/toast/useToast';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';

const Result = () => {
  // const { data } = useGetFeedbackById(1);
  // const { data } = useGetAllFeedbacksBySurveyId('123');
  // const { data } = useGetAllReviewersBySurveyId('123');
  // const { data } = useGetReviewersSummaryBySurveyId('123');
  // const { data } = useGetFeedbackSummaryBySurveyId('123');
  const { isLoading, data } = useCheckSurveyId();

  return (
    <LoadingHandler isLoading={isLoading} fallback={<FixedSpinner />}>
      <div>{data?.survey_id}</div>
    </LoadingHandler>
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
