import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import ReceivedFeedbackCard from '~/features/feedback/ReceivedFeedbackCard';
import { get } from '~/libs/api';
import colors from '~/styles/color';
import { BODY_1, HEAD_1 } from '~/styles/typo';

interface Reviewer {
  collaboration_experience: boolean;
  nickname: string;
  position: string;
}

interface Feedback {
  feedback_id: number;
  created_at: string;
  reviwer: Reviewer;
  is_read: boolean;
}

export default function FeedbackList() {
  const [feedbacksByYearAndMonth, setFeedbacksByYearAndMonth] = useState(undefined);
  const [feedbackCount, setFeedbackCount] = useState(0);

  const getFeedbackList = async () => {
    const feedbackList = await get('/reviewers?survey-id=1');
    setFeedbackCount(feedbackList.feedbacks.length);

    const feedbacksByYearAndMonthList = {};
    feedbackList.feedbacks.forEach((feedback: Feedback) => {
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

  useEffect(() => {
    getFeedbackList();
  }, []);

  const renderReceivedFeedbackCards = () => {
    const now = new Date();
    const feedbackList = [];
    for (const year in feedbacksByYearAndMonth) {
      for (const month in feedbacksByYearAndMonth[year]) {
        const feedbacks = feedbacksByYearAndMonth[year][month];
        const feedbackItems = feedbacks.map((feedback: Feedback) => {
          return <ReceivedFeedbackCard key={feedback.feedback_id} feedback={feedback} />;
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

  return (
    <main css={feedbackListCss}>
      <header css={titleCss}>
        받은 피드백 <span css={titleNumberCss}>{feedbackCount}</span>{' '}
      </header>
      <article css={feedbackPerMonthCss}>{renderReceivedFeedbackCards()}</article>
    </main>
  );
}

const feedbackListCss = css`
  display: flex;
  flex-direction: column;

  width: 375px;
  height: 100vh;
  padding: 23px;

  background-color: ${colors.gray_50};
`;

const titleCss = css`
  ${HEAD_1}

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
  justify-content: space-between;
`;
