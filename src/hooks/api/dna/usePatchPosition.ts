import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { patch } from '~/libs/api';

interface PatchPositionRequest {
  position: string;
}

const usePatchPosition = (options?: UseMutationOptions<void, unknown, PatchPositionRequest>) => {
  return useMutation<void, unknown, PatchPositionRequest>(
    ['position edit'],
    (request) => patch(`/v1/users`, request),
    options,
  );
};

export default usePatchPosition;
