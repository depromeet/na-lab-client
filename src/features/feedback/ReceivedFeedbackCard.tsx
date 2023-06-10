import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';

import colors from '~/styles/color';
import { HEAD_2_BOLD } from '~/styles/typo';

import CollaborationBadge from './CollaborationBadge';
import UnreadBadgeIcon from './UnreadBadgeIcon';

import blueProgrammer from '/public/images/feedback/blue-programmer.png';
import greenPm from '/public/images/feedback/green-pm.png';
import pinkDesigner from '/public/images/feedback/pink-designer.png';
import Purple from '/public/images/feedback/purple.png';

interface Reviewer {
  collaboration_experience: boolean;
  nickname: string;
  position: string;
}

interface Feedback {
  feedback_id: number;
  created_at: Date;
  reviwer: Reviewer;
  is_read: boolean;
}

interface Props {
  feedback: Feedback;
}

type Position = 'developer' | 'designer' | 'product-manager' | 'other';

const ReceivedFeedbackCard = ({ feedback }: Props) => {
  const [role, setRole] = useState('개발자');
  const [roleImage, setRoleImage] = useState(blueProgrammer);

  const { reviwer, is_read } = feedback;
  const { nickname, collaboration_experience, position } = reviwer;

  const changeImageCardByRole = (roleInput: string) => {
    if (roleInput === ('developer' as Position)) {
      setRole('개발자');
      setRoleImage(blueProgrammer);
    } else if (roleInput === ('designer' as Position)) {
      setRole('디자이너');
      setRoleImage(pinkDesigner);
    } else if (roleInput === ('product-manager' as Position)) {
      setRole('기획자');
      setRoleImage(greenPm);
    } else {
      setRole('지인');
      setRoleImage(Purple);
    }
  };

  useEffect(() => {
    changeImageCardByRole(position);
  }, []);

  return (
    <section css={containerCss}>
      {is_read ? null : <UnreadBadgeIcon floatingTop="8px" floatingRight="8px" />}

      <figure css={BodyCss}>
        <Image css={ImageCss} src={roleImage} alt="포지션별 이미지" />
        <div css={[HEAD_2_BOLD, DescCss]}>
          {role} {nickname}의<br />
          피드백
        </div>
      </figure>
      <footer css={FooterCss}>{collaboration_experience ? <CollaborationBadge variant="gray" /> : null}</footer>
    </section>
  );
};

export default ReceivedFeedbackCard;

const containerCss = css`
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

const ImageCss = css`
  width: 65px;
  height: 60px;
  margin: 20px auto auto;
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
