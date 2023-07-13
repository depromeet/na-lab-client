import { post } from '~/libs/api';

interface DefaultQuestionFeedback {
  question_id: string;
}

export interface ChoiceQuestionFeedback extends DefaultQuestionFeedback {
  type: 'choice';
  choices: string[];
}

export interface ShortQuestionFeedback extends DefaultQuestionFeedback {
  type: 'short';
  reply: string[];
}

export type QuestionFeedback = ChoiceQuestionFeedback | ShortQuestionFeedback;

interface PostFeedbackRequest {
  reviewer: {
    collaboration_experience: boolean;
    position: ReviewerPosition;
  };
  question_feedback: QuestionFeedback[];
}

const usePostFeedbackBySurveyId = (surveyId: string) => {
  const postFeedback = async (request: PostFeedbackRequest) => {
    await post(`/v1/feedbacks?survey-id=${surveyId}`, request);
  };

  return postFeedback;
};

export default usePostFeedbackBySurveyId;
