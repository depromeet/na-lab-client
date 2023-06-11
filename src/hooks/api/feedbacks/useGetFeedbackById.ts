import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Request {
  feedback_id: number;
  created_at: string;
  reviewer: Reviewer;
  question: QuestionWithIsRead[];
}

const useGetFeedbackById = (id: number, options?: UseQueryOptions<Request>) => {
  return useQuery<Request>({ queryKey: ['feedback', id], queryFn: () => get<Request>(`/feedbacks/${id}`), ...options });
};

export default useGetFeedbackById;
