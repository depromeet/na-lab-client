import { useState } from 'react';
import { css } from '@emotion/react';

import NewFeedbackBadge from '~/components/badge/NewFeedbackBadge';
import InternalLink from '~/components/link/InternalLink';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';

// NOTE: ConditionalCtaLink와 동일, 임시 컴포넌트
// bottom bar가 나오면 제거 예정
const ConditionalSurveyLink = () => {
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

export default ConditionalSurveyLink;

const CreateQuestionFormLink = () => {
  return (
    <InternalLink href="/survey" css={linkCss}>
      질문 폼 생성으로 시작하기
    </InternalLink>
  );
};

interface ResultLinkProps {
  surveyId: string;
}

const ResultLink = ({ surveyId }: ResultLinkProps) => {
  // const { data } = useGetFeedbackSummaryB?ySurveyId(surveyId);
  const data = {
    new_feedback_count: 10,
  };

  return (
    <InternalLink href="/result" css={linkCss}>
      나의 연구 결과 보러가기
      {data && data.new_feedback_count > 0 && (
        <NewFeedbackBadge newFeedbackCount={data.new_feedback_count} css={badgeCss} />
      )}
    </InternalLink>
  );
};

const linkCss = css`
  position: relative;

  display: flex;
  gap: 4px;
  align-items: center;

  width: 100%;

  color: white;
  text-align: left;
  text-decoration: none;
`;

const badgeCss = css`
  padding: 0 6px;
  font-size: 12px;
`;
