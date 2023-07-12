import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

export interface Response {
  question_feedback: QuestionFeedback[];
}

const useGetAllFeedbacksBySurveyId = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['feedbacks', surveyId],
    // queryFn: () => get<Response>(`/v2/surveys/${surveyId}/feedbacks`),
    queryFn: () => get<Response>(`/v1/feedbacks?survey-id=${surveyId}`),
    ...options,
  });
};

export default useGetAllFeedbacksBySurveyId;
