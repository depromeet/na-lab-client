import { type Url } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';

type SurveyPaths = '/survey' | '/survey/intro' | '/survey/create' | '/survey/join' | '/survey/link';
type ResultPaths = '/result';

export type InternalPaths = '/' | SurveyPaths | ResultPaths;

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

/**
 * @description
 * next useRouter hook의 push 메서드를 type safe하게 사용할 수 있는 훅 입니다.
 * `push` 외의 메서드는 useRouter와 동일합니다.
 */
const useInternalRouter = () => {
  const router = useRouter();

  return {
    ...router,
    push: (path: InternalPaths, as?: Url, options?: TransitionOptions) => router.push(path, as, options),
  };
};

export default useInternalRouter;
