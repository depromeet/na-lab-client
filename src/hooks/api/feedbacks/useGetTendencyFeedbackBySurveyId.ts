import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface ResultChoice extends Choice {
  selected_count: number;
}

interface TendencyQuestion extends ChoiceQuestion {
  choices: ResultChoice[];
}

interface Response {
  question_feedback: TendencyQuestion[];
}

export const getTendencyFeedbackResult = (surveyId: string) =>
  get<Response>(`v2/feedbacks?survey-id=${surveyId}&form-type=tendency`);

const useGetTendencyFeedbackBySurveyId = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery({
    queryKey: ['tendency feedback', surveyId],
    queryFn: () => getTendencyFeedbackResult(surveyId),
    ...options,
  });
};

export default useGetTendencyFeedbackBySurveyId;
