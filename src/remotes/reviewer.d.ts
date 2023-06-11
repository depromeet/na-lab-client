type ReviewerPosition = 'designer' | 'developer' | 'product-manager' | 'others';

interface Reviewer {
  nickname: string;
  collaboration_experience: boolean;
  position: ReviewerPosition;
}
