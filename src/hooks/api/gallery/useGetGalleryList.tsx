import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '~/libs/api';

interface Request {
  gallery_id?: string; //마지막으로 조회된 갤러리의 id를 입력
  position?: string;
  order_type?: string;
  count?: number;
}

export interface GalleryType {
  gallery_id: string;
  target: {
    target_id: string;
    nickname: string;
    position: string;
    job: string;
    image_url: string;
  };
  survey: {
    survey_id: string;
    feedback_count: number;
    bookmarked_count: number;
    feedbacks: string[];
    tendencies: {
      name: string;
      count: number;
    }[];
  };
}

interface Response {
  last_gallery_id: string;
  count: number;
  gallerys: GalleryType[];
}

const useGetGalleryList = (request: Request, options?: UseQueryOptions<Response>) => {
  return useQuery<Response>({
    queryKey: ['gallerys', request],
    queryFn: () =>
      get<Response>('/v1/gallerys', {
        data: request,
      }),
    ...options,
    initialData: DUMMY,
  });
};

export default useGetGalleryList;

export const DUMMY_GALLERY = {
  gallery_id: '12345',
  target: {
    target_id: '67890',
    nickname: '하유나',
    position: '나랩 디자이너',
    job: 'DEVELOPER',
    image_url: 'https://example.com/userimage.jpg',
  },
  survey: {
    survey_id: '458252083624467537',
    feedback_count: 10,
    bookmarked_count: 5,
    feedbacks: [
      '유나는 2D그래픽을 꼼꼼하게 잘 하는 것 같아.',
      '그리고 리서치를 하면서 재미있고 논리적인 인사이트를 잘 도출하는 모습이 보였어!',
      '디프만 프로젝트를 할 때 그...',
    ],
    tendencies: [
      {
        name: '논리적인',
        count: 100,
      },
      {
        name: '열정적인',
        count: 97,
      },
      {
        name: '완벽주의적인',
        count: 32,
      },
      {
        name: '책임감 강한',
        count: 22,
      },
      {
        name: '공감 능력이 좋은',
        count: 11,
      },
    ],
  },
};
const DUMMY: Response = {
  last_gallery_id: '123456',
  count: 5,
  gallerys: [
    {
      gallery_id: '12345',
      target: {
        target_id: '67890',
        nickname: '하유나',
        position: '나랩 디자이너',
        job: 'DEVELOPER',
        image_url: 'https://example.com/userimage.jpg',
      },
      survey: {
        survey_id: '458252083624467537',
        feedback_count: 10,
        bookmarked_count: 5,
        feedbacks: [
          '유나는 2D그래픽을 꼼꼼하게 잘 하는 것 같아.',
          '그리고 리서치를 하면서 재미있고 논리적인 인사이트를 잘 도출하는 모습이 보였어!',
          '디프만 프로젝트를 할 때 그...',
        ],
        tendencies: [
          {
            name: '논리적인',
            count: 100,
          },
          {
            name: '열정적인',
            count: 97,
          },
          {
            name: '완벽주의적인',
            count: 32,
          },
          {
            name: '책임감 강한',
            count: 22,
          },
          {
            name: '공감 능력이 좋은',
            count: 11,
          },
        ],
      },
    },
    {
      gallery_id: '123456',
      target: {
        target_id: '67890',
        nickname: '하유나',
        position: '나랩 디자이너',
        job: 'DEVELOPER',
        image_url: 'https://example.com/userimage.jpg',
      },
      survey: {
        survey_id: '458252083624467537',
        feedback_count: 10,
        bookmarked_count: 5,
        feedbacks: [
          '유나는 2D그래픽을 꼼꼼하게 잘 하는 것 같아.',
          '그리고 리서치를 하면서 재미있고 논리적인 인사이트를 잘 도출하는 모습이 보였어!',
          '디프만 프로젝트를 할 때 그...',
        ],
        tendencies: [
          {
            name: '논리적인',
            count: 100,
          },
          {
            name: '열정적인',
            count: 97,
          },
          {
            name: '완벽주의적인',
            count: 32,
          },
          {
            name: '책임감 강한',
            count: 22,
          },
          {
            name: '공감 능력이 좋은',
            count: 11,
          },
        ],
      },
    },
  ],
};
