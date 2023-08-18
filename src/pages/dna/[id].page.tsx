import { type ReactElement, useEffect, useState } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { type Softskills } from '~/components/graphic/softskills/type';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import SEO from '~/components/SEO/SEO';
import { type DNA, DNA_MAP_BY_GROUP } from '~/constants/dna';
import useGetBookmarkedFeedbacks from '~/hooks/api/feedbacks/useGetBookmarkedFeedbacksBySurveyId';
import useGetTendencyFeedbackBySurveyId, {
  getTendencyFeedbackResult,
} from '~/hooks/api/feedbacks/useGetTendencyFeedbackBySurveyId';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import useGetUserInfoBySurveyId, { getUserInfoBySurveyId } from '~/hooks/api/user/useGetUserInfoBySurveyId';
import {
  type GetServerSidePropsWithDehydratedStateAndSEO,
  type NextPageWithLayout,
  type WithSeoProps,
} from '~/types/page';
import { type CreateImage, createImage } from '~/utils/createImage';
import { getResultGroup, type Group } from '~/utils/resultLogic';

import LoadedDna from './LoadedDna';
import { type DnaOwnerStatus } from './type';

const Dna: NextPageWithLayout<WithSeoProps<ServerSideProps>> = ({
  surveyId,
  downloadableImage,
  seo: { title, description, ogImage },
}) => {
  const { data: userInfo, isLoading } = useGetUserInfoBySurveyId(String(surveyId), { enabled: Boolean(surveyId) });
  const { tendencies } = useSortedTop5Tendencies(surveyId);
  const { dnaOwnerStatus } = useDanOnwerStatus(surveyId);
  const { dnaInfo, group } = useDnaInfo(surveyId);
  const { bookmarkedFeedbacks } = useBookmarkedFeedbacks(surveyId);

  return (
    <>
      <SEO title={title} description={description} ogImage={ogImage} />

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
            downloadableImage={downloadableImage}
          />
        )}
      </LoadingHandler>
    </>
  );
};

export default Dna;

Dna.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

type ServerSideProps = {
  surveyId: string;
  downloadableImage: CreateImage;
};

const OG_IMAGE_BASE = '/images/dna/seo';
const OG_IMAGE_MAP_BY_GROUP: Record<Group, string> = {
  A: `${OG_IMAGE_BASE}/A.webp`,
  B: `${OG_IMAGE_BASE}/B.webp`,
  C: `${OG_IMAGE_BASE}/C.webp`,
  D: `${OG_IMAGE_BASE}/D.webp`,
  E: `${OG_IMAGE_BASE}/E.webp`,
  F: `${OG_IMAGE_BASE}/F.webp`,
};

export const getServerSideProps: GetServerSidePropsWithDehydratedStateAndSEO<ServerSideProps> = async (context) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  const [userInfo, tendencyFeedbackResult] = await Promise.all([
    queryClient.fetchQuery(['user', id], () => getUserInfoBySurveyId(id)),
    queryClient.fetchQuery(['tendency feedback', id], () => getTendencyFeedbackResult(id)),
  ]);

  const tendencies = [...tendencyFeedbackResult.question_feedback[0].choices];
  const group = getResultGroup(tendencies);

  if (!userInfo || !tendencies) {
    return {
      notFound: true,
    };
  }

  const { base64 } = await createImage({
    group: group,
    userInfo: userInfo,
  });

  if (typeof base64 !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      surveyId: id,
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: userInfo.nickname,
        description: userInfo.position,
        ogImage: OG_IMAGE_MAP_BY_GROUP[group],
      },
      downloadableImage: {
        base64: base64,
      },
    },
  };
};

const TENDENCY_SLICE_NUMBER = 5;

const useSortedTop5Tendencies = (surveyId: string | string[] | undefined) => {
  const [tendencies, setTendencies] = useState<Softskills[]>([]);
  const { data } = useGetTendencyFeedbackBySurveyId(String(surveyId), { enabled: Boolean(surveyId) });

  useEffect(() => {
    if (!data) return;
    const notSortedTendencies = [...data.question_feedback[0].choices];
    const sortedTendencies = notSortedTendencies
      .sort((a, b) => b.selected_count - a.selected_count)
      .map((tendency) => tendency.content)
      .slice(0, TENDENCY_SLICE_NUMBER);

    setTendencies(sortedTendencies as Softskills[]);
  }, [data]);

  return { tendencies };
};

const useDnaInfo = (surveyId: string | string[] | undefined) => {
  const [dnaInfo, setDnaInfo] = useState<DNA | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const { data } = useGetTendencyFeedbackBySurveyId(String(surveyId), { enabled: Boolean(surveyId) });

  useEffect(() => {
    if (!data) return;
    const notSortedTendencies = [...data.question_feedback[0].choices];
    const nextGroup = getResultGroup(notSortedTendencies);
    setGroup(nextGroup);
    setDnaInfo(DNA_MAP_BY_GROUP[nextGroup]);
  }, [data]);

  return { dnaInfo, group };
};

const useDanOnwerStatus = (surveyId: string | string[] | undefined) => {
  const [dnaOwnerStatus, setDnaOwnerStatus] = useState<DnaOwnerStatus>('loading');

  const { data, sessionStatus } = useGetSurveyIdByUserStatus();

  useEffect(() => {
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
  }, [data, sessionStatus, surveyId]);

  return { dnaOwnerStatus };
};

const useBookmarkedFeedbacks = (surveyId: string | string[] | undefined) => {
  const [bookmarkedFeedbacks, setBookmarkedFeedbacks] = useState<QuestionFeedback[]>([]);

  const { data } = useGetBookmarkedFeedbacks(String(surveyId), { enabled: Boolean(surveyId) });

  useEffect(() => {
    if (!data) return;

    setBookmarkedFeedbacks(data.question_feedback);
  }, [data]);

  return { bookmarkedFeedbacks };
};
