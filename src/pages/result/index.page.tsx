import { type ReactElement } from 'react';
import { useSession } from 'next-auth/react';

import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import useToast from '~/components/toast/useToast';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';

import SurveyIdLoaded from './SurveyIdLoaded';

const Result = () => {
  // NOTE: 아래 3개의 훅은 필요한 곳 찾아 사용 필요
  // const { data } = useGetFeedbackById(1);
  // const { data: ass } = useGetAllFeedbacksBySurveyId('123');
  // const { data } = useGetAllReviewersBySurveyId('123');

  // NOTE: 현재 쌓인 데이터가 없어서, 개발할 시 mock에 요청 보내면서 해당 데이터 사용 X
  // <LoadingHandler isLoading={false} fallback={<FixedSpinner />}>
  // {data && <SurveyIdLoaded surveyId={'123'} />}
  // 위처럼 변경해서 개발 필요
  const { isLoading, data } = useCheckSurveyId();

  return (
    <LoadingHandler isLoading={isLoading} fallback={<FixedSpinner />}>
      {/* TODO: useCheckSurveyId 의 데이터 넣기 필요 */}
      {data && <SurveyIdLoaded surveyId={data.survey_id} />}
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
