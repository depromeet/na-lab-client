import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  feedback_id: string;
  created_at: string;
  reviewer: Reviewer;
  question: QuestionWithIsRead[];
}

const useGetFeedbackById = (id: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['feedback', id],
    queryFn: () => get<Response>(`/v1/feedbacks/${id}`),
    ...options,
  });
};

export default useGetFeedbackById;
