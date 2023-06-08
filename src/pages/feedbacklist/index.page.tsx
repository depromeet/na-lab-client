import { css } from '@emotion/react';

import ReceivedFeedbackCard from '~/features/feedback/ReceivedFeedbackCard';
import { BODY_1, HEAD_1 } from '~/styles/typo';

export default function FeedbackList() {
  // todo semantic tag
  // todo public Received Feedback file image 추가
  return (
    <div css={feedbackListCss}>
      <div css={titleCss}>받은 피드백 (개수) </div>
      <div css={feedbackPerMonthCss}>
        <div css={monthTitleCss}>1월</div>
        <div css={monthFeedbackListCss}>
          <ReceivedFeedbackCard />
          <ReceivedFeedbackCard />
          <ReceivedFeedbackCard />
          <ReceivedFeedbackCard />
          <ReceivedFeedbackCard />
        </div>
      </div>
    </div>
  );
}

const feedbackListCss = css`
  display: flex;
  flex-direction: column;
`;

const titleCss = css`
  ${HEAD_1}
`;

const feedbackPerMonthCss = css`
  display: flex;
  flex-direction: column;
`;

const monthTitleCss = css`
  ${BODY_1}
`;

const monthFeedbackListCss = css`
  display: flex;
  flex-direction: row;
`;
