import React, { type ReactElement, useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';

import Header from '~/components/header/Header';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import SEO from '~/components/SEO/SEO';
import ReceivedFeedbackCard from '~/features/feedback/ReceivedFeedbackCard';
import useGetAllReviewersBySurveyId from '~/hooks/api/reviewers/useGetAllReviewersBySurveyId';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import colors from '~/styles/color';
import GlobalBackgroundColor from '~/styles/GlobalBackgroundColor';
import { BODY_1, HEAD_1 } from '~/styles/typo';

interface Feedback {
  feedback_id: string;
  created_at: string;
  reviewer: Reviewer;
  is_read: boolean;
}

interface Response {
  feedbacks: Feedback[];
}

interface Feedbacks {
  [year: string]: FeedbacksByMonth;
}

interface FeedbacksByMonth {
  [month: string]: Feedback[];
}

export default function FeedbackList() {
  const theme = useTheme();
  const router = useInternalRouter();

  const surveyId = router.query.id;

  const { data } = useGetAllReviewersBySurveyId(String(surveyId));

  const [feedbacksByYearAndMonth, setFeedbacksByYearAndMonth] = useState<Feedbacks | undefined>(undefined);
  const [feedbackCount, setFeedbackCount] = useState(0);

  const getFeedbackList = (feedbackList: Response) => {
    const feedbacksByYearAndMonthList: Feedbacks = {};

    feedbackList.feedbacks.reverse().forEach((feedback: Feedback) => {
      const date = new Date(feedback.created_at);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (!feedbacksByYearAndMonthList[year]) {
        feedbacksByYearAndMonthList[year] = {};
      }

      if (!feedbacksByYearAndMonthList[year][month]) {
        feedbacksByYearAndMonthList[year][month] = [];
      }
      feedbacksByYearAndMonthList[year][month].push(feedback);
    });

    setFeedbacksByYearAndMonth(feedbacksByYearAndMonthList);
  };

  const onClickFeedback = (feedbackId: string) => {
    router.push(`/feedback/${feedbackId}`);
  };

  const renderReceivedFeedbackCards = () => {
    const now = new Date();
    const feedbackList = [];
    for (const year in feedbacksByYearAndMonth) {
      for (const month in feedbacksByYearAndMonth[year]) {
        const feedbacks = feedbacksByYearAndMonth[year][month];
        const feedbackItems = feedbacks.map((feedback: Feedback) => {
          return (
            <ReceivedFeedbackCard key={feedback.feedback_id} feedback={feedback} onClickFeedback={onClickFeedback} />
          );
        });

        feedbackList.push(
          <div key={`${year}-${month}`}>
            <span css={monthTitleCss}>
              {now.getFullYear() === Number(year) ? `${month}월` : `${year}년 ${month}월`}
            </span>
            <section css={monthFeedbackListCss}>{feedbackItems}</section>
          </div>,
        );
      }
    }

    return feedbackList;
  };

  useEffect(() => {
    if (data) {
      getFeedbackList(data);
      setFeedbackCount(data.feedbacks.length);
    }
  }, [data]);

  return (
    <>
      <SEO />
      <GlobalBackgroundColor globalBackgroundColor={theme.colors.gray_50} />

      <Header title={'연구결과'} isContainRemainer />
      <main css={containerCss}>
        <section css={contentCss}>
          <header css={titleCss}>
            받은 피드백 <span css={titleNumberCss}>{feedbackCount}</span>
          </header>
          <article css={feedbackPerMonthCss}>{renderReceivedFeedbackCards()}</article>
        </section>
      </main>
    </>
  );
}

FeedbackList.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

const containerCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const contentCss = css`
  width: 100%;
  margin: 0 auto;
`;

const titleCss = css`
  ${HEAD_1}

  margin-top: 54px;
  margin-bottom: 31px;
`;

const titleNumberCss = css`
  color: ${colors.primary_200};
`;

const feedbackPerMonthCss = css`
  display: flex;
  flex-direction: column;
`;

const monthTitleCss = css`
  ${BODY_1}

  margin-bottom: 16px;
`;

const monthFeedbackListCss = css`
  display: flex;
  flex-flow: row wrap;
  gap: 7px;
  justify-content: space-between;
`;
