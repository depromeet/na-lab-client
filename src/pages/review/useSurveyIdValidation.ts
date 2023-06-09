import { useState } from 'react';

import useToast from '~/components/toast/useToast';
import useGetSurveyById from '~/hooks/api/surveys/useGetSurveyById';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';

const useSurveyIdValidation = () => {
  const {
    push,
    isReady,
    query: { id },
  } = useInternalRouter();

  const [validatedId, setValidatedId] = useState<string | null>(null);

  const { fireToast } = useToast();

  const handleInvalidateId = () => {
    push('/');
    fireToast({ content: '잘못된 접근입니다.' });
  };

  useDidUpdate(() => {
    if (!isReady) return;
    if (typeof id !== 'string') {
      handleInvalidateId();

      return;
    }

    setValidatedId(id);
  }, [isReady]);

  const query = useGetSurveyById(validatedId as string, { enabled: Boolean(validatedId) });

  useDidUpdate(() => {
    if (!query.isLoading) return;
    if (query.isError) {
      handleInvalidateId();
    }
  }, [query.isLoading, query.isError]);

  return query;
};

export default useSurveyIdValidation;
