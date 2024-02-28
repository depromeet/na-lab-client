export interface TargetType {
  target_id: string;
  nickname: string;
  position: string;
  job: string;
  image_url: string;
}

interface TendencyType {
  name: string;
  count: number;
}

export interface SurveyType {
  survey_id: string;
  feedback_count: number;
  bookmarked_count: number;
  feedbacks: string[];
  tendencies: TendencyType[];
}
