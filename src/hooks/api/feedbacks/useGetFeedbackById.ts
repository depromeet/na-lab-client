import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  feedback_id: number;
  created_at: string;
  reviewer: Reviewer;
  question: QuestionWithIsRead[];
}

const useGetFeedbackById = (id: number, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['feedback', id],
    queryFn: () => get<Response>(`/feedbacks/${id}`),
    ...options,
  });
};

export default useGetFeedbackById;
