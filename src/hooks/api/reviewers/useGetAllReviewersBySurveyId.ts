import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Feedback {
  feedback_id: string;
  created_at: string;
  is_read: boolean;
  reviewer: Reviewer;
}

interface Response {
  feedbacks: Feedback[];
}

const useGetAllReviewersBySurveyId = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['reviewers', surveyId],
    queryFn: () => get<Response>(`/v1/reviewers?survey-id=${surveyId}`),
    ...options,
  });
};

export default useGetAllReviewersBySurveyId;
