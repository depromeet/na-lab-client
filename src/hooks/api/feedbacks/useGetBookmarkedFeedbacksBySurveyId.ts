import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  question_feedback: QuestionFeedback[];
}

const useGetBookmarkedFeedbacks = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: [surveyId, 'bookmarked feedbacks'],
    queryFn: () => get<Response>(`/mock/feedbacks/bookmarks?survey-id=${surveyId}`),
    ...options,
  });
};

export default useGetBookmarkedFeedbacks;
