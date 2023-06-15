import { useState } from 'react';

import InternalLink from '~/components/link/InternalLink';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';

const ConditionalCtaLink = () => {
  const [isNotFound, setIsNotFound] = useState(false);

  const { data, sessionStatus } = useGetSurveyIdByUserStatus({
    onError: (error) => {
      if (error.code === 404) {
        setIsNotFound(true);
      }
    },
  });

  if (sessionStatus === 'unauthenticated') return <CreateQuestionFormLink />;
  if (sessionStatus === 'authenticated' && Boolean(data)) return <ResultLink />;
  if (isNotFound) return <CreateQuestionFormLink />;

  return <CreateQuestionFormLink />;
};

export default ConditionalCtaLink;

const CreateQuestionFormLink = () => {
  return <InternalLink href="/survey">질문 폼 생성으로 시작하기</InternalLink>;
};

const ResultLink = () => {
  return <InternalLink href="/result">나의 연구 결과 보러가기</InternalLink>;
};
