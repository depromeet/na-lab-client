import { type FC, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { css } from '@emotion/react';

import useGetFeedbackSummaryBySurveyId from '~/hooks/api/feedbacks/useGetFeedbackSummaryBySurveyId';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import recordEvent from '~/utils/event';

import useSnackBar from './useSnackBar';

const 새_피드백_스낵바_뜨기_전_시간 = 1500;

const NewFeedbackSnackBarListener: FC = () => {
  const { status } = useSession();

  const { data, isSuccess } = useGetSurveyIdByUserStatus();
  const { data: feedbackSummary } = useGetFeedbackSummaryBySurveyId(data?.survey_id as string, {
    enabled: isSuccess,
  });

  const { fireSnackBar } = useSnackBar();

  const router = useInternalRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') return;
    if (!feedbackSummary) return;

    if (feedbackSummary.new_feedback_count > 0) {
      setTimeout(() => {
        fireSnackBar({
          content: (
            <>
              새로운 피드백이 도착했어요! <span css={tagCss}>+{feedbackSummary.new_feedback_count}</span>
            </>
          ),
          onClick: () => {
            recordEvent({ action: '새로운 피드백 스낵바 클릭', value: `${feedbackSummary.new_feedback_count}개` });
            router.push('/result');
          },
        });
      }, 새_피드백_스낵바_뜨기_전_시간);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackSummary, fireSnackBar, status]);

  return null;
};

export default NewFeedbackSnackBarListener;

const tagCss = css`
  display: inline-block;

  height: 24px;
  margin-left: 10px;
  padding: 0 8px;

  background-color: #f85b81;
  border-radius: 24px;
`;
