import { useState } from 'react';
import { css } from '@emotion/react';

import NewFeedbackBadge from '~/components/badge/NewFeedbackBadge';
import CTAButton from '~/components/button/CTAButton';
import InternalLink from '~/components/link/InternalLink';
import useGetFeedbackSummaryBySurveyId from '~/hooks/api/feedbacks/useGetFeedbackSummaryBySurveyId';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';

const ConditionalCtaLink = () => {
  const [isNotFound, setIsNotFound] = useState(false);

  const { data, sessionStatus, isLoading } = useGetSurveyIdByUserStatus({
    onError: (error) => {
      if (error.code === 404) {
        setIsNotFound(true);
      }
    },
  });

  if (sessionStatus === 'loading') return null;
  if (sessionStatus === 'unauthenticated') return <CreateQuestionFormLink />;

  if (isLoading) return null;
  if (isNotFound) return <CreateQuestionFormLink />;

  if (data) return <ResultLink surveyId={data.survey_id} />;

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

interface ResultLinkProps {
  surveyId: string;
}

const ResultLink = ({ surveyId }: ResultLinkProps) => {
  const { data } = useGetFeedbackSummaryBySurveyId(surveyId);

  return (
    <InternalLink href="/result" css={linkCss}>
      <CTAButton>나의 연구 결과 보러가기</CTAButton>

      {data && data.new_feedback_count > 0 && (
        <NewFeedbackBadge newFeedbackCount={data.new_feedback_count} css={badgeCss} />
      )}
    </InternalLink>
  );
};

const linkCss = css`
  position: relative;
  width: 100%;
  text-decoration: none;
`;

const badgeCss = css`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
`;
