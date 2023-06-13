import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Target {
  id: number;
  nickname: string;
}

type FormType = 'tendency' | 'choice' | 'strength';

export interface DefaultQuestion {
  question_id: string;
  order: number;
  title: string;
  form_type: FormType;
}

interface ShortQuestion extends DefaultQuestion {
  type: 'short';
}

interface ChoiceQuestion extends DefaultQuestion {
  type: 'choice';
  max_selectable_count: number;
  choices: Choice[];
}

export interface Response {
  survey_id: string;
  question_count: number;
  target: Target;
  question: (ShortQuestion | ChoiceQuestion)[];
}

const useGetSurveyById = (id: string, option?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['survey', id],
    queryFn: () => get<Response>(`/surveys/${id}`),
    ...option,
  });
};

export default useGetSurveyById;
