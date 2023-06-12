import { type ReactElement } from 'react';

import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';

const Result = () => {
  // const { data } = useGetFeedbackById(1);
  // const { data } = useGetAllFeedbacksBySurveyId('123');
  // const { data } = useGetAllReviewersBySurveyId('123');
  // const { data } = useGetReviewersSummaryBySurveyId('123');
  // const { data } = useGetFeedbackSummaryBySurveyId('123');

  return <div>result</div>;
};

export default Result;

Result.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;
