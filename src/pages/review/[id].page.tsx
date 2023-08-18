/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import SEO from '~/components/SEO/SEO';
import { getSurveyById, getSurveyByIdQueryKey } from '~/hooks/api/surveys/useGetSurveyById';
import { getUserInfoBySurveyId, getUserInfoBySurveyIdQueryKey } from '~/hooks/api/user/useGetUserInfoBySurveyId';
import { type GetServerSidePropsWithDehydratedStateAndSEO, type WithSeoProps } from '~/types/page';

import LoadedSurvey from './LoadedSurvey';

type ServerSideProps = Awaited<ReturnType<typeof getSurveyById>>;

const ReviewPage: NextPage<WithSeoProps<ServerSideProps>> = ({ survey_id, question_count, target, question, seo }) => {
  return (
    <>
      <SEO title={seo.title} description={seo.description} />

      <LoadedSurvey survey_id={survey_id} question_count={question_count} target={target} question={question} />
    </>
  );
};

export default ReviewPage;

export const getServerSideProps: GetServerSidePropsWithDehydratedStateAndSEO<ServerSideProps> = async (context) => {
  const { id } = context.query;

  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }

  const queryClient = new QueryClient();

  const [survey, userInfo] = await Promise.all([
    queryClient.fetchQuery(getSurveyByIdQueryKey(id), () => getSurveyById(id)),
    queryClient.fetchQuery(getUserInfoBySurveyIdQueryKey(id), () => getUserInfoBySurveyId(id)),
  ]);

  if (!survey || !userInfo) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      survey_id: survey.survey_id,
      question_count: survey.question_count,
      target: survey.target,
      question: survey.question,
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: `${userInfo.nickname} 님에게 익명 피드백 하기`,
        description: '나의 커리어 DNA 연구소',
      },
    },
  };
};
