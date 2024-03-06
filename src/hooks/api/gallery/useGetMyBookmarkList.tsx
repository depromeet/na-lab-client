// const useGetGalleryList = (request: Request, options?: UseQueryOptions<Response>) => {
//   return useQuery<Response>({
//     queryKey: ['gallerys', request],
//     queryFn: () =>
//       get<Response>(
//         `/v1/gallerys?page=${request.page}&job=${request.position}&order-type=${request.order_type}&count=${request.count}`,
//       ),
//     ...options,
//   });
// };

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

// /v1/surveys/bookmarks?last-survey-id={survey_id}&order-type={order_type}&count={count}
type OrderType = 'latest' | 'update';

interface Request {
  order_type: OrderType;
  // TODO : 페이징 추가
  // last_survey_id: string;
  // count?: number;
}

interface Response {
  // TODO : 페이징 추가
  bookmarked_surveys: {
    survey_id: string;
    target_id: string;
    nickname: string;
    position: string;
    job: string;
    image_url: string;
  }[];
}

const useGetMyBookmarkList = (request: Request, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['surveys', 'bookmarks', request],
    queryFn: () => get<Response>(`/v1/surveys/bookmarks`),
    ...options,
  });
};

export default useGetMyBookmarkList;
