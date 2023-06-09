import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Target {
  id: number;
  nickname: string;
}

interface ShortQuestion {
  type: 'short';
  question_id: number;
  order: number;
  title: string;
}

interface Choice {
  choice_id: number;
  order: number;
  content: string;
}

interface ChoiceQuestion {
  type: 'choice';
  question_id: number;
  order: number;
  max_selectable_count: number;
  title: string;
  choices: Choice[];
}

interface Request {
  survey_id: number;
  question_count: number;
  target: Target;
  questions: (ShortQuestion | ChoiceQuestion)[];
}

const useGetSurveyById = (id: string, option?: UseQueryOptions<Request>) => {
  return useQuery<Request>({
    queryKey: ['survey', id],
    queryFn: () => get<Request>(`/surveys/${id}`),
    ...option,
  });
};

export default useGetSurveyById;
