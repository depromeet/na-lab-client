import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Target {
  id: number;
  nickname: string;
}

type FormType = 'tendency' | 'choice' | 'strength';

interface DefaultQuestion {
  question_id: number;
  order: number;
  title: string;
  form_type: FormType;
}

interface ShortQuestion extends DefaultQuestion {
  type: 'short';
}

export interface Choice {
  choice_id: number;
  order: number;
  content: string;
}

interface ChoiceQuestion extends DefaultQuestion {
  type: 'choice';
  max_selectable_count: number;
  choices: Choice[];
}

export interface Request {
  survey_id: number;
  question_count: number;
  target: Target;
  question: (ShortQuestion | ChoiceQuestion)[];
}

const useGetSurveyById = (id: string, option?: UseQueryOptions<Request>) => {
  return useQuery<Request>({
    queryKey: ['survey', id],
    queryFn: () => get<Request>(`/surveys/${id}`),
    ...option,
  });
};

export default useGetSurveyById;
