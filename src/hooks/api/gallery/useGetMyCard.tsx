import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';
import { type GalleryType } from '~/remotes/gallery';

type Response = GalleryType;

const useGetMyCard = (options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['gallerys', 'logins'],
    queryFn: () => get<Response>('/v1/gallerys/logins'),
    ...options,
  });
};

export default useGetMyCard;
