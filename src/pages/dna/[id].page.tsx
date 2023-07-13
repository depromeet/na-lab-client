import { type ReactElement, useState } from 'react';

import { type Softskills } from '~/components/graphic/softskills/type';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import SEO from '~/components/SEO/SEO';
import { type DNA, DNA_MAP_BY_GROUP } from '~/constants/dna';
import useGetBookmarkedFeedbacks from '~/hooks/api/feedbacks/useGetBookmarkedFeedbacksBySurveyId';
import useGetTendencyFeedbackBySurveyId from '~/hooks/api/feedbacks/useGetTendencyFeedbackBySurveyId';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import useGetUserInfoBySurveyId from '~/hooks/api/user/useGetUserInfoBySurveyId';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import { getResultGroup, type Group } from '~/utils/resultLogic';

import LoadedDna from './LoadedDna';
import { type DnaOwnerStatus } from './type';

// TODO: SSR > SEO 타이틀 변경
const Dna = () => {
  const router = useInternalRouter();
  const surveyId = router.query.id;

  const { data: userInfo, isLoading } = useGetUserInfoBySurveyId(String(surveyId), { enabled: Boolean(surveyId) });
  const { tendencies } = useSortedTop5Tendencies(surveyId);
  const { dnaOwnerStatus } = useDanOnwerStatus(surveyId);
  const { dnaInfo, group } = useDnaInfo(surveyId);
  const { bookmarkedFeedbacks } = useBookmarkedFeedbacks(surveyId);

  return (
    <>
      <SEO />
      <LoadingHandler isLoading={isLoading || dnaOwnerStatus === 'loading'} fallback={<FixedSpinner />}>
        {typeof surveyId === 'string' && dnaInfo && group && (
          <LoadedDna
            surveyId={surveyId}
            group={group}
            dnaInfo={dnaInfo}
            dnaOwnerStatus={dnaOwnerStatus}
            userInfo={userInfo}
            topTendencies={tendencies}
            bookmarkedFeedbacks={bookmarkedFeedbacks}
          />
        )}
      </LoadingHandler>
    </>
  );
};

export default Dna;

Dna.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

const TENDENCY_SLICE_NUMBER = 5;

const useSortedTop5Tendencies = (surveyId: string | string[] | undefined) => {
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

const useDnaInfo = (surveyId: string | string[] | undefined) => {
  const [dnaInfo, setDnaInfo] = useState<DNA | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const { data, isSuccess } = useGetTendencyFeedbackBySurveyId(String(surveyId), { enabled: Boolean(surveyId) });

  useDidUpdate(() => {
    if (!data) return;
    const notSortedTendencies = [...data.question_feedback[0].choices];
    const nextGroup = getResultGroup(notSortedTendencies);
    setGroup(nextGroup);
    setDnaInfo(DNA_MAP_BY_GROUP[nextGroup]);
  }, [isSuccess, data]);

  return { dnaInfo, group };
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

const useBookmarkedFeedbacks = (surveyId: string | string[] | undefined) => {
  const [bookmarkedFeedbacks, setBookmarkedFeedbacks] = useState<QuestionFeedback[]>([]);

  const { data, isSuccess } = useGetBookmarkedFeedbacks(String(surveyId), { enabled: Boolean(surveyId) });

  useDidUpdate(() => {
    if (!data) return;

    setBookmarkedFeedbacks(data.question_feedback);
  }, [isSuccess]);

  return { bookmarkedFeedbacks };
};
