import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { type QuestionRequest } from '~/features/survey/types';
import { post } from '~/libs/api';

interface CreateSurveyResponse {
  survey_id: string;
}

interface CreateSurveyRequest {
  question_count: number;
  question: QuestionRequest[];
}

const useCreateSurvey = (options?: UseMutationOptions<CreateSurveyResponse, unknown, CreateSurveyRequest>) => {
  return useMutation<CreateSurveyResponse, unknown, CreateSurveyRequest>({
    mutationFn: ({ question_count, question }) => post<CreateSurveyResponse>('/surveys', { question_count, question }),
    ...options,
  });
};

export default useCreateSurvey;
