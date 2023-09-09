import { useMutation, type UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import { patch } from '~/libs/api';

import { BOOKMAKRED_FEEDBACKS_QUERY_KEY } from './useGetBookmarkedFeedbacksBySurveyId';

const usePatchBookmark = (form_question_feedback_id: string, options?: UseMutationOptions<void, unknown, void>) => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, void>(
    ['bookmark switch'],
    () => patch(`/v1/feedbacks/bookmarks?form-question-feedback-id=${form_question_feedback_id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['feedbacks']);
        queryClient.invalidateQueries([BOOKMAKRED_FEEDBACKS_QUERY_KEY]);
      },
      ...options,
    },
  );
};

export default usePatchBookmark;
