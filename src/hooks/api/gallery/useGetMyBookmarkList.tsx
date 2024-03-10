import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

type OrderType = 'latest' | 'update';

interface Request {
  order_type: OrderType;
  // TODO : 페이징 추가
}

export interface BookmarkedSurveyType {
  survey_id: string;
  target_id: string;
  nickname: string;
  position: string;
  job: string;
  image_url: string;
}

interface Response {
  // TODO : 페이징 추가
  bookmarked_surveys: BookmarkedSurveyType[];
}

const useGetMyBookmarkList = (request: Request, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['surveys', 'bookmarks', request],
    queryFn: () => get<Response>(`/v1/surveys/bookmarks`),
    ...options,
  });
};

export default useGetMyBookmarkList;
