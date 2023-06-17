import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import WarningIcon from '~/components/icons/WarningIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import useCreateSurvey from '~/hooks/api/surveys/useCreateSurvey';

const useCreateSurveyAction = () => {
  const router = useRouter();
  const { fireToast } = useToast();

  const { status } = useSession();
  const { mutate: createSurvey } = useCreateSurvey();

  const handleErrorMessage = () => {
    fireToast({
      content: (
        <>
          <WarningIcon />
          <Toast.Text>나의 질문 폼 생성에 실패했습니다. 생성페이지로 이동합니다.</Toast.Text>
        </>
      ),
    });
    router.push('/survey/create');
  };
  const onCreate = () => {
    if (status === 'authenticated') {
      const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY.surveyCreateSurveyRequest);
      if (!jsonData) {
        handleErrorMessage();

        return;
      }
      const createSurveyRequest = JSON.parse(jsonData);

      createSurvey(
        { question: createSurveyRequest, question_count: createSurveyRequest.length },
        {
          onSuccess: (res) => {
            fireToast({
              content: <Toast.Text>나의 질문 폼을 생성하였습니다.</Toast.Text>,
            });
            router.push(`/survey/link?id=${res.survey_id}`);
            localStorage.removeItem(LOCAL_STORAGE_KEY.surveyCreateSurveyRequest);
            localStorage.removeItem(LOCAL_STORAGE_KEY.surveyCustomQuestions);
          },
          onError: (err) => {
            handleErrorMessage();
            console.error(err);
          },
        },
      );
    }
  };

  return { onCreate };
};

export default useCreateSurveyAction;
