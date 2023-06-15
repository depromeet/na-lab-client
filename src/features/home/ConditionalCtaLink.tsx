import { useState } from 'react';
import { css } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';
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

  if (Boolean(data)) return <ResultLink />;
  if (sessionStatus === 'unauthenticated') return <CreateQuestionFormLink />;
  if (isNotFound) return <CreateQuestionFormLink />;

  return <CreateQuestionFormLink />;
};

export default ConditionalCtaLink;

const CreateQuestionFormLink = () => {
  return (
    <InternalLink href="/survey" css={linkCss}>
      <CTAButton>질문 폼 생성으로 시작하기</CTAButton>
    </InternalLink>
  );
};

const ResultLink = () => {
  return (
    <InternalLink href="/result" css={linkCss}>
      <CTAButton>나의 연구 결과 보러가기</CTAButton>
    </InternalLink>
  );
};

const linkCss = css`
  width: 100%;
`;
