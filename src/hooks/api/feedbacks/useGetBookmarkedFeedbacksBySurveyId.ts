import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  question_feedback: QuestionFeedback[];
}

export const BOOKMAKRED_FEEDBACKS_QUERY_KEY = 'bookmarked feedbacks';
export const getBookmarkedFeedbacksQueryKey = (surveyId: string) => [BOOKMAKRED_FEEDBACKS_QUERY_KEY, surveyId];

const useGetBookmarkedFeedbacks = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: getBookmarkedFeedbacksQueryKey(surveyId),
    queryFn: () => get<Response>(`/v1/feedbacks/bookmarks?survey-id=${surveyId}`),
    ...options,
  });
};

export default useGetBookmarkedFeedbacks;
