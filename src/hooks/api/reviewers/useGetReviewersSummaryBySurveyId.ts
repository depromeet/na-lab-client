import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface CollaborationExperience {
  yes: number;
  no: number;
}

type Position = {
  [key in ReviewerPosition]: number;
};

interface Response {
  collaboration_experience: CollaborationExperience;
  position: Position;
}

const useGetReviewersSummaryBySurveyId = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['reviewers summary', surveyId],
    queryFn: () => get<Response>(`/reviewers/summary?survey-id=${surveyId}`),
    ...options,
  });
};

export default useGetReviewersSummaryBySurveyId;
