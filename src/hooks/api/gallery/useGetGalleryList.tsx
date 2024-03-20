import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';
import { type GalleryType } from '~/remotes/gallery';

/**
 * @param page  조회할 페이지를 입력
 * @param position 조회할 갤러리의 position을 입력 (ex. 'all')
 * @param order_type 정렬 기준을 입력
 * @param count 조회할 갤러리의 개수
 */
interface Request {
  page?: number;
  position?: string;
  order_type?: string;
  count?: number;
}

interface Response {
  total_page: number;
  galleries: GalleryType[];
}

export const getGalleryListQueryKey = (request: Request) => ['gallerys', request];

const useGetGalleryList = (request: Request, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: getGalleryListQueryKey(request),
    queryFn: () =>
      get<Response>(`/v1/gallerys`, {
        params: {
          page: request.page,
          job: request.position,
          'order-type': request.order_type,
          count: request.count,
        },
      }),
    ...options,
  });
};

export default useGetGalleryList;
