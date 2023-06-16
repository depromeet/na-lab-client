import { useSession } from 'next-auth/react';

import WarningIcon from '~/components/icons/WarningIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import { type QuestionRequest } from '~/features/survey/types';
import useCreateSurvey from '~/hooks/api/surveys/useCreateSurvey';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import useLocalStorage from '~/hooks/storage/useLocalStorage';

const useCreateSurveyAction = () => {
  const router = useInternalRouter();
  const { fireToast } = useToast();

  const { status } = useSession();
  const { mutate: createSurvey } = useCreateSurvey();
  const [createSurveyRequest] = useLocalStorage<QuestionRequest[]>(LOCAL_STORAGE_KEY.surveyCreateSurveyRequest, []);

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
            localStorage.removeItem(LOCAL_STORAGE_KEY.surveyCreateSurveyRequest);
            localStorage.removeItem(LOCAL_STORAGE_KEY.surveyCustomQuestions);
          },
          onError: (err) => {
            fireToast({
              content: (
                <>
                  <WarningIcon />
                  <Toast.Text>나의 질문 폼 생성에 실패했습니다. 생성페이지로 이동합니다.</Toast.Text>
                </>
              ),
            });
            console.error(err);
            router.push('/survey/create');
          },
        },
      );
    }
  };

  return { onCreate };
};

export default useCreateSurveyAction;
