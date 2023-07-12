import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  target_id: number;
  nickname: string;
  position: string;
}

const useGetUserInfoBySurveyId = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['user', surveyId],
    queryFn: () => get<Response>(`https://dev.nalab.me/v1/users?survey-id=${surveyId}`),
    ...options,
  });
};

export default useGetUserInfoBySurveyId;
