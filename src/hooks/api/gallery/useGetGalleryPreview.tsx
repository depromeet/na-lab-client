import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';
import { type SurveyType, type TargetType } from '~/remotes/gallery';

interface Response {
  target: TargetType;
  survey: SurveyType;
}

const useGetGalleryPreview = (options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['gallerys', 'previews'],
    queryFn: () => get<Response>('/v1/gallerys/previews'),
    ...options,
  });
};

export default useGetGalleryPreview;
