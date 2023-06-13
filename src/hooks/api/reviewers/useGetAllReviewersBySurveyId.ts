import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Feedback {
  feedback_id: number;
  created_at: string;
  is_read: boolean;
  reviwer: Reviewer;
}

interface Response {
  feedbacks: Feedback[];
}

const useGetAllReviewersBySurveyId = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['reviewers', surveyId],
    queryFn: () => get<Response>(`/reviewers?survey-id=${surveyId}`),
    ...options,
  });
};

export default useGetAllReviewersBySurveyId;
