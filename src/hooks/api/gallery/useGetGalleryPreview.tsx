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
    initialData: DUMMY,
  });
};

export default useGetGalleryPreview;

const DUMMY = {
  target: {
    target_id: '67890',
    nickname: '하유나',
    position: '나랩 디자이너',
    job: 'DESIGNER',
    image_url: 'https://example.com/userimage.jpg',
  },
  survey: {
    survey_id: '54321',
    feedback_count: 10,
    bookmarked_count: 5,
    feedbacks: [
      '유나는 2D그래픽을 꼼꼼하게 잘 하는 것 같아.',
      '그리고 리서치를 하면서 재미있고 논리적인 인사이트를 잘 도출하는 모습이 보였어!',
      '디프만 프로젝트를 할 때 그...',
    ],
    tendencies: [
      { name: '논리적인', count: 100 },
      { name: '열정적인', count: 97 },
      { name: '완벽주의적인', count: 32 },
      { name: '책임감 강한', count: 22 },
      { name: '공감 능력이 좋은', count: 11 },
    ],
  },
};
