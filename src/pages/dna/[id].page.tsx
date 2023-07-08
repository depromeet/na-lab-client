import { type ReactElement, useState } from 'react';

import { type Softskills } from '~/components/graphic/softskills/type';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import SEO from '~/components/SEO/SEO';
import useGetTendencyFeedbackBySurveyId from '~/hooks/api/feedbacks/useGetTendencyFeedbackBySurveyId';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import useGetUserInfoBySurveyId from '~/hooks/api/user/useGetUserInfoBySurveyId';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';

import LoadedDna from './LoadedDna';
import { type DnaOwnerStatus } from './type';

const Dna = () => {
  const router = useInternalRouter();
  const surveyId = router.query.id;

  const { data: userInfo, isLoading } = useGetUserInfoBySurveyId(String(surveyId), { enabled: Boolean(surveyId) });
  const { tendencies } = useSortedTendencies(surveyId);
  const { dnaOwnerStatus } = useDanOnwerStatus(surveyId);

  return (
    <>
      <SEO />

      <LoadingHandler isLoading={isLoading || dnaOwnerStatus === 'loading'} fallback={<FixedSpinner />}>
        <LoadedDna dnaOwnerStatus={dnaOwnerStatus} userInfo={userInfo} topTendencies={tendencies} />
      </LoadingHandler>
    </>
  );
};

export default Dna;

Dna.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

const TENDENCY_SLICE_NUMBER = 5;

const useSortedTendencies = (surveyId: string | string[] | undefined) => {
  const [tendencies, setTendencies] = useState<Softskills[]>([]);
  const { data, isSuccess } = useGetTendencyFeedbackBySurveyId(String(surveyId), { enabled: Boolean(surveyId) });

  useDidUpdate(() => {
    if (!data) return;
    const notSortedTendencies = [...data.question_feedback[0].choices];
    const sortedTendencies = notSortedTendencies
      .sort((a, b) => b.selected_count - a.selected_count)
      .map((tendency) => tendency.content)
      .slice(0, TENDENCY_SLICE_NUMBER);

    setTendencies(sortedTendencies as Softskills[]);
  }, [isSuccess]);

  return { tendencies };
};

const useDanOnwerStatus = (surveyId: string | string[] | undefined) => {
  const [dnaOwnerStatus, setDnaOwnerStatus] = useState<DnaOwnerStatus>('loading');

  const { data, sessionStatus } = useGetSurveyIdByUserStatus();

  useDidUpdate(() => {
    if (sessionStatus === 'loading') return;
    if (sessionStatus === 'unauthenticated') {
      setDnaOwnerStatus('other');

      return;
    }

    if (!data) return;

    if (data.survey_id === String(surveyId)) {
      setDnaOwnerStatus('current_user');
    } else {
      setDnaOwnerStatus('other');
    }
  }, [data, sessionStatus]);

  return { dnaOwnerStatus };
};
