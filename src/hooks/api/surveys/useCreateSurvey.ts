import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { type QuestionRequest } from '~/features/survey/types';
import { post } from '~/libs/api';

interface CreateSurveyRequest {
  question_count: number;
  question: QuestionRequest[];
}

const useCreateSurvey = (options?: UseMutationOptions<unknown, unknown, CreateSurveyRequest>) => {
  return useMutation<unknown, unknown, CreateSurveyRequest>({
    mutationFn: ({ question_count, question }) => post('/surveys', { question_count, question }),
    ...options,
  });
};

export default useCreateSurvey;
