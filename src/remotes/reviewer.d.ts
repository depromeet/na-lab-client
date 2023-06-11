type ReviewerPosition = 'designer' | 'developer' | 'product-manager' | 'others';

/**
 * reviewer_id 없음
 */
interface Reviewer {
  nickname: string;
  collaboration_experience: boolean;
  position: ReviewerPosition;
}

interface ReviewerWithId extends Reviewer {
  reviewer_id: number;
}
