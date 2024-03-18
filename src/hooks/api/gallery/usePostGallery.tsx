import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { post } from '~/libs/api';
import { type GalleryType } from '~/remotes/gallery';

interface Request {
  job: string;
}

type Response = GalleryType;

const usePostGallery = (options?: UseMutationOptions<Response, unknown, Request>) => {
  return useMutation<Response, unknown, Request>({
    mutationFn: (request: Request) => post<Response>('/v1/gallerys', request),
    ...options,
  });
};

export default usePostGallery;
