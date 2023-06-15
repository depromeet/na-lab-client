import { useLayoutEffect, useState } from 'react';
import { css, type Theme } from '@emotion/react';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import Softskill from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';
import Header from '~/components/header/Header';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import LineThreeDotsIcon from '~/components/icons/LineThreeDotsIcon';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import Pill, { type Color } from '~/components/pill/Pill';
import CollaborationCounter from '~/features/feedback/CollaborationCounter';
import Feedback from '~/features/feedback/Feedback';
import ParticipatingReviewerChart from '~/features/feedback/ParticipatingReviewerChart';
import QuestionListRow from '~/features/feedback/QuestionListRow';
import ResearchMoveAnchor from '~/features/feedback/ResearchMoveAnchor';
import MultipleChoiceAnswer from '~/features/multipleChoiceAnswer/MultipleChoiceAnswer';
import useGetAllFeedbacksBySurveyId, {
  type ChoiceQuestionFeedback,
  type Response,
} from '~/hooks/api/feedbacks/useGetAllFeedbacksBySurveyId';
import useGetFeedbackSummaryBySurveyId from '~/hooks/api/feedbacks/useGetFeedbackSummaryBySurveyId';
import useGetReviewersSummaryBySurveyId from '~/hooks/api/reviewers/useGetReviewersSummaryBySurveyId';
import useBoolean from '~/hooks/common/useBoolean';
import useScrollLock from '~/hooks/common/useScrollLock';
import { useScrollSpy } from '~/hooks/common/useScrollSpy';
import { HEAD_1, HEAD_2_BOLD } from '~/styles/typo';

interface Props {
  surveyId: string;
}

const PILL_COLORS: Color[] = ['bluegreen', 'pink', 'skyblue', 'yellowgreen', 'purple'];

const SurveyIdLoaded = ({ surveyId }: Props) => {
  const { isLoading: isFeedbackSummaryLoading, data: feedbackSummaryData } = useGetFeedbackSummaryBySurveyId(surveyId);
  const { isLoading: isReviewersSummaryLoading, data: reviewersSummaryData } =
    useGetReviewersSummaryBySurveyId(surveyId);
  const { isLoading: isAllDataLoading, data: allData } = useGetAllFeedbacksBySurveyId(surveyId);
  const tendencyCountData = getTendencyCount(allData);

  const [isShowing, toggle, _, setFalse] = useBoolean(false);
  useScrollLock({ lock: isShowing });

  const ids = allData?.question_feedback.map((question) => question.question_id) ?? [];
  const currentObservedId = useScrollSpy(['participatingReviewerId', ...ids]);

  const [innerWidth, setInnerWidth] = useState(0);
  useLayoutEffect(() => {
    const limittedInnerWidth = window.innerWidth > 480 ? 480 : window.innerWidth;
    setInnerWidth(limittedInnerWidth);
  }, []);

  return (
    <LoadingHandler
      isLoading={isFeedbackSummaryLoading || isReviewersSummaryLoading || isAllDataLoading}
      fallback={<FixedSpinner />}
    >
      {allData && feedbackSummaryData && reviewersSummaryData && (
        <>
          <Header
            title="연구 결과"
            rightButton={
              <button type="button" css={headerButtonCss} onClick={toggle}>
                <LineThreeDotsIcon />
              </button>
            }
            isContainRemainer
          />

          <BottomSheet isShowing={isShowing} onClickOutside={setFalse}>
            <BottomSheetHandleIcon onClick={setFalse} />
            <QuestionListRow
              item={{ type: 'participatingReviewer', title: '참여한 동료 정보' }}
              isObservingNow={currentObservedId === 'participatingReviewerId'}
              onListRowClick={() => {
                scrollToTarget('participatingReviewerId');
                setFalse();
              }}
            />

            {allData.question_feedback.map((question) => (
              <QuestionListRow
                key={question.question_id}
                item={question}
                isObservingNow={currentObservedId === question.question_id}
                onListRowClick={() => {
                  scrollToTarget(question.question_id);
                  setFalse();
                }}
              />
            ))}
          </BottomSheet>

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

              <article css={articleGapCss} id="participatingReviewerId">
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

              <article
                css={articleGapCss}
                id={allData.question_feedback.find((question) => question.form_type === 'tendency')?.question_id}
              >
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
                .map((question) =>
                  question.type === 'choice' ? (
                    <article
                      key={question.question_id}
                      css={(theme) => choiceQuestionContainerCss(theme)}
                      id={question.question_id}
                    >
                      <div css={choiceQuestionTitleCss}>
                        <span>Q.</span>
                        <h2>{question.title}</h2>
                      </div>
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
                    </article>
                  ) : (
                    <article
                      key={question.question_id}
                      css={(theme) => shortQuestionContainerCss(theme, innerWidth)}
                      id={question.question_id}
                    >
                      <div css={shortQuestionTitleCss}>
                        <span>Q.</span>
                        <h2>{question.title}</h2>
                      </div>
                      <div css={shortTypeCss}>
                        {question.feedbacks?.map((feedback) => (
                          <Feedback
                            key={feedback.feedback_id}
                            reply={feedback.reply}
                            is_read={feedback.is_read}
                            reviewer={feedback.reviewer}
                          />
                        ))}
                      </div>
                    </article>
                  ),
                )}
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

const choiceQuestionTitleCss = css`
  display: flex;
  gap: 12px;
  ${HEAD_1}

  margin: 16px 0;
`;

const shortQuestionTitleCss = css`
  display: flex;
  gap: 12px;
  ${HEAD_1}

  margin: 16px 7px;
`;

const allFeedbackCountCss = (theme: Theme) => css`
  color: ${theme.colors.primary_200};
`;

const shortQuestionContainerCss = (theme: Theme, innerWidth: number) => css`
  transform: translateX(-23px);
  width: ${innerWidth}px;
  padding: 20px 16px 32px;
  background-color: ${theme.colors.gray_50};
`;

const choiceQuestionContainerCss = (theme: Theme) => css`
  width: 100%;
  padding: 20px 0 32px;
  background-color: ${theme.colors.white};
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
    data?.feedbacks?.forEach((feedback) => {
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

const scrollToTarget = (id: string) => {
  const target = document.querySelector(`#${CSS.escape(id)}`);
  if (target) {
    target.scrollIntoView();
    window.scrollBy(0, -56); // 상단바 높이만큼 위로 스크롤 조절
  }
};
