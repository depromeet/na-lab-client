import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { patch } from '~/libs/api';

const usePatchFeedbackBookmark = (options?: UseMutationOptions<unknown, unknown, unknown>) => {
  return useMutation({
    mutationFn: (formQuestionFeedbackId: string) =>
      patch(`/v1/feedbacks/bookmark?form-question-feedback-id=${formQuestionFeedbackId}`),
    ...options,
  });
};

export default usePatchFeedbackBookmark;
