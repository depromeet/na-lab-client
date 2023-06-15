import { useSession } from 'next-auth/react';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import type ApiException from '~/exceptions/ApiException';
import { get } from '~/libs/api';
import { isUserTokenValidAtom } from '~/store/auth';

interface Response {
  survey_id: string;
}

const useGetSurveyIdByUserStatus = (options?: UseQueryOptions<Response, ApiException>) => {
  const { data, status } = useSession();
  const isUserTokenValid = useAtomValue(isUserTokenValidAtom);

  const query = useQuery<Response, ApiException>({
    queryKey: ['survey id', data?.user?.email],
    queryFn: () => get<Response>('/surveys-id'),
    enabled: status === 'authenticated' && isUserTokenValid,
    ...options,
  });

  return { sessionStatus: status, ...query };
};

export default useGetSurveyIdByUserStatus;
