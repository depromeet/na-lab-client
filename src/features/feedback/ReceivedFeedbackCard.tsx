import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import colors from '~/styles/color';
import { HEAD_2_BOLD } from '~/styles/typo';

import CollaborationBadge from './CollaborationBadge';
import UnreadBadgeIcon from './UnreadBadgeIcon';

interface Reviewer {
  collaboration_experience: boolean;
  nickname: string;
  position: string;
}

interface Feedback {
  feedback_id: string;
  created_at: string;
  reviewer: Reviewer;
  is_read: boolean;
}

interface Props {
  feedback: Feedback;
  onClickFeedback: (arg0: string) => void;
}

type Position = 'developer' | 'designer' | 'pm' | 'others';

const ReceivedFeedbackCard = ({ feedback, onClickFeedback }: Props) => {
  const [role, setRole] = useState('개발자');
  const [roleImage, setRoleImage] = useState('/images/feedback/blue-programmer.png');

  const { feedback_id, reviewer, is_read } = feedback;
  const { nickname, collaboration_experience, position } = reviewer;

  const changeImageCardByRole = (roleInput: string) => {
    if (roleInput === ('developer' as Position)) {
      setRole('개발자');
      setRoleImage('/images/feedback/blue-programmer.png');
    } else if (roleInput === ('designer' as Position)) {
      setRole('디자이너');
      setRoleImage('/images/feedback/pink-designer.png');
    } else if (roleInput === ('pm' as Position)) {
      setRole('기획자');
      setRoleImage('/images/feedback/green-pm.png');
    } else {
      setRole('지인');
      setRoleImage('/images/feedback/purple.png');
    }
  };

  useEffect(() => {
    changeImageCardByRole(position);
  }, []);

  return (
    <section
      css={containerCss}
      role="presentation"
      onClick={() => {
        onClickFeedback(String(feedback_id));
      }}
    >
      {is_read ? null : <UnreadBadgeIcon floatingTop="8px" floatingRight="8px" />}

      <figure css={BodyCss}>
        <span css={ImageCss(roleImage)}></span>
        <div css={[HEAD_2_BOLD, DescCss]}>
          {role} {nickname}의<br />
          피드백
        </div>
      </figure>
      <footer css={FooterCss}>{collaboration_experience ? <CollaborationBadge /> : null}</footer>
    </section>
  );
};

export default ReceivedFeedbackCard;

const containerCss = css`
  cursor: pointer;

  position: relative;

  display: flex;
  flex-direction: column;

  min-width: 161px;
  max-width: 161px;
  height: 215px;
  margin: 3.5px 0;

  background-color: ${colors.white};
  border-radius: 8px;
`;

const BodyCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageCss = (roleImage: string) => css`
  width: 66px;
  height: 60px;
  margin: 20px auto auto;

  background-image: url(${roleImage});
  background-size: cover;
  border-radius: 5px;
`;

const DescCss = css`
  display: flex;

  margin: 16px auto 0;

  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const FooterCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 35px;
  margin-top: 8px;
`;
