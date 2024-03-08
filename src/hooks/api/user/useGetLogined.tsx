import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  id: string;
  nickname: string;
  email: string;
}

export const useGetLogin = (options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['user', 'logins'],
    queryFn: () => get<Response>('/v1/users/logins'),
    ...options,
  });
};
