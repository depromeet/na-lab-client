import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { post } from '~/libs/api';

interface Response {
  target_id: string;
  survey_id: string;
  nickname: string;
  position: string;
  job: string;
  image_url: string;
}

export const useAddBookmark = (surveyId: string, options?: UseMutationOptions<Response>) => {
  return useMutation<Response>({
    mutationFn: () => post(`/v1/surveys/${surveyId}/bookmarks`),
    ...options,
  });
};

export const useCancelBookmark = (surveyId: string, options?: UseMutationOptions<Response>) => {
  return useMutation<Response>({
    mutationFn: () => post(`/v1/surveys/${surveyId}/bookmarks/cancels`),
    ...options,
  });
};
