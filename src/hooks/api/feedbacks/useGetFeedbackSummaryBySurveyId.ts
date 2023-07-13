import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  all_feedback_count: number;
  new_feedback_count: number;
}

const useGetFeedbackSummaryBySurveyId = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['feedbacks summary', surveyId],
    queryFn: () => get<Response>(`/v1/feedbacks/summary?survey-id=${surveyId}`),
    ...options,
  });
};

export default useGetFeedbackSummaryBySurveyId;
