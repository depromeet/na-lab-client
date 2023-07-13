import { type FC } from 'react';
import { css } from '@emotion/react';

import { type DnaOwnerStatus } from '~/pages/dna/type';
import { HEAD_2_BOLD } from '~/styles/typo';

import Feedback from '../feedback/Feedback';

interface Props {
  dnaOwnerStatus: DnaOwnerStatus;
  bookmarkedFeedbacks: QuestionFeedback[];
}

const BookmarkSection: FC<Props> = ({ bookmarkedFeedbacks, dnaOwnerStatus }) => {
  return (
    <section css={crewFeedbackContainer}>
      <p css={subTitleCss}>동료들의 평가</p>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 16px;
        `}
      >
        {bookmarkedFeedbacks.length === 0 && <NothingBookmarked />}

        {bookmarkedFeedbacks.map((feedback) => {
          if (feedback.type === 'short') {
            return feedback.feedbacks.map((item) => (
              <Feedback
                key={item.feedback_id}
                form_question_feedback_id={item.form_question_feedback_id}
                reply={item.reply}
                is_read={item.is_read}
                reviewer={item.reviewer}
                is_bookmarked={item.bookmark.is_bookmarked}
                isBookmarkable={dnaOwnerStatus === 'current_user' ? true : false}
              />
            ));
          }
        })}
      </div>
    </section>
  );
};

export default BookmarkSection;

const crewFeedbackContainer = css`
  transform: translateX(-23px);

  display: flex;
  flex-direction: column;

  width: calc(100% + 23px + 23px);
  padding: 20px 23px 84px;

  background: var(--gray-50-background-secondary, #f4f5f9);
`;

const subTitleCss = css`
  ${HEAD_2_BOLD};

  color: var(--gray-500-text-secondary, #394258);
`;

const NothingBookmarked = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 18px;
        align-items: center;

        margin-bottom: 82px;
      `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="53" height="72" viewBox="0 0 53 72" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.74118 0C1.55882 0 0 1.89278 0 4.54266V69.6541C0 71.1683 1.55882 72.304 2.80588 71.5469L24.6294 56.4047C25.8765 55.6476 27.1235 55.6476 28.3706 56.4047L50.1941 71.5469C51.4412 72.6826 53 71.5469 53 69.6541V4.54266C53 1.89278 51.4412 0 49.2588 0H3.74118ZM26.5 14C27.2671 14 27.8889 14.6218 27.8889 15.3889V25.1111H37.6111C38.3782 25.1111 39 25.7329 39 26.5C39 27.2671 38.3782 27.8889 37.6111 27.8889H27.8889V37.6111C27.8889 38.3782 27.2671 39 26.5 39C25.7329 39 25.1111 38.3782 25.1111 37.6111V27.8889H15.3889C14.6218 27.8889 14 27.2671 14 26.5C14 25.7329 14.6218 25.1111 15.3889 25.1111H25.1111V15.3889C25.1111 14.6218 25.7329 14 26.5 14Z"
          fill="url(#paint0_linear_3709_63871)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3709_63871"
            x1="26.5"
            y1="0"
            x2="26.5"
            y2="101.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#C9CFDF" />
            <stop offset="1" stopColor="#C9CFDF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <span
        css={[
          HEAD_2_BOLD,
          (theme) =>
            css`
              color: ${theme.colors.gray_400};
            `,
        ]}
      >
        아직 북마크한 피드백이 없어요
      </span>
    </div>
  );
};
