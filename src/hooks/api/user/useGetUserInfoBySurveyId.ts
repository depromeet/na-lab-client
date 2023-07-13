import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  target_id: number;
  nickname: string;
  position: string;
}

export const getUserInfoBySurveyId = (surveyId: string) => get<Response>(`/v1/users?survey-id=${surveyId}`);

const useGetUserInfoBySurveyId = (surveyId: string, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['user', surveyId],
    queryFn: () => getUserInfoBySurveyId(surveyId),
    ...options,
  });
};

export default useGetUserInfoBySurveyId;
