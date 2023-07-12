interface DefaultFeedback {
  feedback_id: string;
  created_at: string;
  is_read: boolean;
  form_question_feedback_id: string;
  reviewer: ReviewerWithId;
  bookmark: Bookmark;
}

interface Bookmark {
  bookmarked_at: string;
  is_bookmarked: boolean;
}

interface ChoiceFeedback extends DefaultFeedback {
  choice_id: string[];
}

interface ShortFeedback extends DefaultFeedback {
  reply: string[];
}

interface DefaultQuestionFeedback {
  question_id: string;
  order: number;
  form_type: QuestionFormType;
  title: string;
}

interface ChoiceQuestionFeedback extends DefaultQuestionFeedback {
  type: 'choice';
  choices: Choice[];
  feedbacks: ChoiceFeedback[];
}

interface ShortQuestionFeedback extends DefaultQuestionFeedback {
  type: 'short';
  feedbacks: ShortFeedback[];
}

type QuestionFeedback = ChoiceQuestionFeedback | ShortQuestionFeedback;
