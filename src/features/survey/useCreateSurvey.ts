import { useSession } from 'next-auth/react';

import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import { type QuestionRequest } from '~/features/survey/types';
import useCreateSurvey from '~/hooks/api/surveys/useCreateSurvey';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import useLocalStorage from '~/hooks/storage/useLocalStorage';

const useCreateSurveyAction = () => {
  const router = useInternalRouter();

  const { status } = useSession();
  const { mutate: createSurvey } = useCreateSurvey();
  const [createSurveyRequest, setCreateSurveyRequest] = useLocalStorage<QuestionRequest[]>(
    LOCAL_STORAGE_KEY.surveyCreateSurveyRequest,
    [],
  );

  const onCreate = () => {
    if (status === 'authenticated') {
      createSurvey(
        { question: createSurveyRequest, question_count: createSurveyRequest.length },
        {
          onSuccess: (res) => {
            router.push('/survey/link', {
              query: {
                id: res.survey_id,
              },
            });
            // TODO: 생성에 쓰인 로컬스토리지 값 비우기
          },
        },
      );
    }
  };

  return { onCreate };
};

export default useCreateSurveyAction;
