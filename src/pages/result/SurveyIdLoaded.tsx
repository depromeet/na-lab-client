import { css } from '@emotion/react';

import Header from '~/components/header/Header';
import LineThreeDotsIcon from '~/components/icons/LineThreeDotsIcon';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import ParticipatingReviewerChart from '~/features/feedback/ParticipatingReviewerChart';
import ResearchMoveAnchor from '~/features/feedback/ResearchMoveAnchor';
import useGetFeedbackSummaryBySurveyId from '~/hooks/api/feedbacks/useGetFeedbackSummaryBySurveyId';
import useGetReviewersSummaryBySurveyId from '~/hooks/api/reviewers/useGetReviewersSummaryBySurveyId';

interface Props {
  surveyId: string;
}

const SurveyIdLoaded = ({ surveyId }: Props) => {
  const { isLoading, data } = useGetFeedbackSummaryBySurveyId(surveyId);
  const { data: reviewersSummaryData } = useGetReviewersSummaryBySurveyId(surveyId);

  // TODO: 부분 로딩 혹은 useQuries로 대응 가능
  return (
    <LoadingHandler isLoading={isLoading} fallback={<FixedSpinner />}>
      {data && reviewersSummaryData && (
        <>
          <Header
            title="연구 결과"
            rightButton={
              // TODO: bottom sheet
              <button type="button" css={headerButtonCss}>
                <LineThreeDotsIcon />
              </button>
            }
            isContainRemainer
          />

          <main>
            <section>
              <h2>피드백</h2>
              <ResearchMoveAnchor newFeedbackNumber={data.new_feedback_count} />
            </section>

            <section>
              <h2>참여한 동료 정보</h2>
              {/* TODO: 리팩토링 필요 */}
              <ParticipatingReviewerChart
                data={[
                  { position: 'pm', amount: reviewersSummaryData.position.pm },
                  { position: 'designer', amount: reviewersSummaryData.position.designer },
                  { position: 'developer', amount: reviewersSummaryData.position.developer },
                  { position: 'others', amount: reviewersSummaryData.position.others },
                ]}
              />

              <article>
                {/* TODO: 그래픽 적용 */}
                <div>
                  협업 경험 없어요
                  <span>{reviewersSummaryData.collaboration_experience.no}</span>
                </div>

                <div>
                  협업 경험 있어요
                  <span>{reviewersSummaryData.collaboration_experience.yes}</span>
                </div>
              </article>
            </section>

            {/* TODO:  list render */}

            {/* TODO: form_type: tendency인 경우 '동료들이 고른 나의 이미지' */}
            {/* TODO: type: choice, short에 따라 분류 */}
          </main>
        </>
      )}
    </LoadingHandler>
  );
};

export default SurveyIdLoaded;

const headerButtonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
