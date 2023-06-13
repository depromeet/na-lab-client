import { useSession } from 'next-auth/react';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  survey_id: string;
}

const useGetSurveyIdByUserStatus = (options?: UseQueryOptions<Response>) => {
  const { data, status } = useSession();

  return useQuery<Response>({
    queryKey: ['survey id', data?.user?.email],
    queryFn: () => get<Response>('/surveys-id'),
    enabled: status === 'authenticated',
    ...options,
  });
};

export default useGetSurveyIdByUserStatus;
