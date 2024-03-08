import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Response {
  id: string;
  nickname: string;
}

export const useGetLogined = (options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['user', 'logined'],
    queryFn: () => get<Response>('/v1/users/logined'),
    ...options,
  });
};
