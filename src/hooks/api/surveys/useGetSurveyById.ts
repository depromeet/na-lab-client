import { useQuery } from '@tanstack/react-query';

import { get } from '~/libs/api';

const useGetSurveyById = (id: string) => {
  return useQuery({ queryKey: ['survey', id], queryFn: () => get(`/surveys/${id}`) });
};

export default useGetSurveyById;
