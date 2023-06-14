import { useLayoutEffect, useState } from 'react';
import { css, type Theme } from '@emotion/react';

import Softskill from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';
import Header from '~/components/header/Header';
import LineThreeDotsIcon from '~/components/icons/LineThreeDotsIcon';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import Pill, { type Color } from '~/components/pill/Pill';
import CollaborationCounter from '~/features/feedback/CollaborationCounter';
import Feedback from '~/features/feedback/Feedback';
import ParticipatingReviewerChart from '~/features/feedback/ParticipatingReviewerChart';
import ResearchMoveAnchor from '~/features/feedback/ResearchMoveAnchor';
import MultipleChoiceAnswer from '~/features/multipleChoiceAnswer/MultipleChoiceAnswer';
import useGetAllFeedbacksBySurveyId, {
  type ChoiceQuestionFeedback,
  type Response,
} from '~/hooks/api/feedbacks/useGetAllFeedbacksBySurveyId';
import useGetFeedbackSummaryBySurveyId from '~/hooks/api/feedbacks/useGetFeedbackSummaryBySurveyId';
import useGetReviewersSummaryBySurveyId from '~/hooks/api/reviewers/useGetReviewersSummaryBySurveyId';
import { HEAD_1, HEAD_2_BOLD } from '~/styles/typo';

interface Props {
  surveyId: string;
}

const PILL_COLORS: Color[] = ['bluegreen', 'pink', 'skyblue', 'yellowgreen', 'purple'];

const SurveyIdLoaded = ({ surveyId }: Props) => {
  const { isLoading, data: feedbackSummaryData } = useGetFeedbackSummaryBySurveyId(surveyId);
  const { data: reviewersSummaryData } = useGetReviewersSummaryBySurveyId(surveyId);
  const { data: allData } = useGetAllFeedbacksBySurveyId(surveyId);

  const tendencyCountData = getTendencyCount(allData);

  const [innerWidth, setInnerWidth] = useState(0);

  useLayoutEffect(() => {
    const limittedInnerWidth = window.innerWidth > 480 ? 480 : window.innerWidth;
    setInnerWidth(limittedInnerWidth);
  }, []);

  return (
    <LoadingHandler isLoading={isLoading} fallback={<FixedSpinner />}>
      {feedbackSummaryData && reviewersSummaryData && (
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
            <section css={upperSectionCss}>
              <article>
                <h2 css={titleCss}>
                  피드백{' '}
                  <span css={(theme) => allFeedbackCountCss(theme)}>{feedbackSummaryData.all_feedback_count}</span>
                </h2>
                <div css={ResearchMoveAnchorCss(innerWidth)}>
                  <ResearchMoveAnchor newFeedbackNumber={feedbackSummaryData.new_feedback_count} />
                </div>
              </article>

              <article css={articleGapCss}>
                <h2 css={titleCss}>참여한 동료 정보</h2>
                <div css={chartWrapperCss}>
                  <ParticipatingReviewerChart
                    chartCss={chartCss(innerWidth)}
                    data={[
                      { position: 'pm', amount: reviewersSummaryData.position.pm },
                      { position: 'designer', amount: reviewersSummaryData.position.designer },
                      { position: 'developer', amount: reviewersSummaryData.position.developer },
                      { position: 'others', amount: reviewersSummaryData.position.others },
                    ]}
                  />
                  <CollaborationCounter
                    count={{
                      yes: reviewersSummaryData.collaboration_experience.yes,
                      no: reviewersSummaryData.collaboration_experience.no,
                    }}
                  />
                </div>
              </article>

              <article css={articleGapCss}>
                <h2 css={titleCss}>동료들이 고른 나의 이미지</h2>
                <div css={pillContainer}>
                  {tendencyCountData?.map((tendency, idx) => (
                    <Pill
                      size={idx < 5 ? 'large' : 'medium'}
                      color={PILL_COLORS[idx] ?? 'default'}
                      key={tendency.choice_id}
                    >
                      <Softskill name={tendency.content} />
                      {tendency.content.replaceAll('_', ' ')}
                      <span css={HEAD_2_BOLD}>{tendency.count}</span>
                    </Pill>
                  ))}
                </div>
              </article>
            </section>

            <section>
              {allData?.question_feedback
                .filter((question) => question.form_type !== 'tendency')
                .map((question) => (
                  <article
                    key={question.question_id}
                    css={(theme) => questionArticleCss(theme, question.type, innerWidth)}
                  >
                    <div css={questionTitleCss}>
                      <span>Q.</span>
                      <h2>{question.title}</h2>
                    </div>
                    {question.type === 'choice' ? (
                      <div css={choiceTypeCss}>
                        {getChoiceCount(question).choiceDataWithCount.map((choice) => {
                          return (
                            <MultipleChoiceAnswer
                              key={choice.choice_id}
                              variant={choice.isMost ? 'highlighted' : 'default'}
                              totalCount={choice.allCount}
                              answeredCount={choice.count}
                              answerText={choice.content}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div css={shortTypeCss}>
                        {question.feedbacks.map((feedback) => (
                          <Feedback
                            key={feedback.feedback_id}
                            reply={feedback.reply}
                            is_read={feedback.is_read}
                            reviewer={feedback.reviewer}
                          />
                        ))}
                      </div>
                    )}
                  </article>
                ))}
            </section>
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

const upperSectionCss = css`
  display: flex;
  flex-direction: column;
  gap: 50px;

  padding-top: 12px;
  padding-bottom: 44px;
`;

const articleGapCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const chartWrapperCss = css`
  display: flex;
  flex-direction: column;
  gap: 33.33px;
  padding-top: 16px;
`;

const pillContainer = css`
  display: flex;
  flex-wrap: wrap;
  row-gap: 11px;
  column-gap: 10px;

  white-space: pre-wrap;
`;

const chartCss = (innerWidth: number) => css`
  transform: translateX(-23px);
  width: ${innerWidth}px;
`;

const ResearchMoveAnchorCss = (innerWidth: number) => css`
  transform: translateX(-23px);
  width: ${innerWidth}px;
`;

const titleCss = css`
  ${HEAD_1}

  margin: 16px 0;
`;

const questionTitleCss = css`
  display: flex;
  gap: 12px;
  ${HEAD_1}

  margin: 16px 0;
`;

const allFeedbackCountCss = (theme: Theme) => css`
  color: ${theme.colors.primary_200};
`;

const questionArticleCss = (theme: Theme, type: 'choice' | 'short', innerWidth: number) => css`
  transform: ${type === 'short' ? 'translateX(-23px)' : 'none'};
  width: ${type === 'short' ? innerWidth + 'px' : '100%'};
  padding: ${type === 'short' ? '20px 16px 32px' : '20px 0 32px 0'};
  background-color: ${type === 'choice' ? theme.colors.white : theme.colors.gray_50};
`;

const choiceTypeCss = css`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;
const shortTypeCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const getTendencyCount = (
  data?: Response,
): {
  count: number;
  choice_id: string;
  content: Softskills;
  order: number;
}[] => {
  const tendencyData = data?.question_feedback.find(
    (question) => question.form_type === 'tendency' && question.type === 'choice',
  ) as ChoiceQuestionFeedback;

  return tendencyData?.choices
    .map((choice) => {
      let count = 0;
      tendencyData.feedbacks.forEach((feedback) => {
        count += feedback.choice_id.includes(choice.choice_id) ? 1 : 0;
      });

      return { ...choice, count };
    })
    .filter((choice) => Boolean(choice.count))
    .sort((a, b) => b.count - a.count);
};

const getChoiceCount = (
  data: ChoiceQuestionFeedback,
): {
  choiceDataWithCount: {
    count: number;
    choice_id: string;
    content: string;
    order: number;
    allCount: number;
    isMost: boolean;
  }[];
} => {
  const choiceDataWithCount = data?.choices.map((choice) => {
    let count = 0;
    data.feedbacks.forEach((feedback) => {
      count += feedback.choice_id.includes(choice.choice_id) ? 1 : 0;
    });

    return { ...choice, count };
  });

  const allCount = choiceDataWithCount.reduce((acc, cur) => acc + cur.count, 0);

  const _choiceDataWithCount = choiceDataWithCount.map((choice) => {
    const mostVotedChoiceId = [...choiceDataWithCount].sort((a, b) => b.count - a.count)[0].choice_id;

    return { ...choice, allCount: allCount, isMost: choice.choice_id === mostVotedChoiceId };
  });

  return { choiceDataWithCount: _choiceDataWithCount };
};
