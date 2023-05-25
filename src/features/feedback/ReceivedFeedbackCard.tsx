import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';

import colors from '~/styles/color';
import { HEAD_2_BOLD } from '~/styles/typo';

import blueProgrammer from '../../../public/images/blue-programmer.png';
import greenPm from '../../../public/images/green-pm.png';
import pinkDesigner from '../../../public/images/pink-designer.png';
import Purple from '../../../public/images/purple.png';
import CollaborationBadge from './CollaborationBadge';
import UnreadBadgeIcon from './UnreadBadgeIcon';

interface Props {
  isRead?: boolean;
  feedbackUser?: string;
  isCollaborate?: boolean;
}

const ReceivedFeedbackCard = ({ isRead = false, feedbackUser = '개발자', isCollaborate = true }: Props) => {
  const [roleImage, setRoleImage] = useState(blueProgrammer);

  const changeImageCardByRole = (roleInput: string) => {
    if (roleInput === '개발자') {
      setRoleImage(blueProgrammer);
    } else if (roleInput === '디자이너') {
      setRoleImage(pinkDesigner);
    } else if (roleInput === '기획자') {
      setRoleImage(greenPm);
    } else {
      setRoleImage(Purple);
    }
  };

  useEffect(() => {
    changeImageCardByRole(feedbackUser);
  }, []);

  return (
    <section css={containerCss}>
      {isRead ? null : <UnreadBadgeIcon floatingTop="8px" floatingRight="8px" />}

      <figure css={BodyCss}>
        <Image css={ImageCss} src={roleImage} alt="포지션별 이미지" />
        <div css={[HEAD_2_BOLD, DescCss]}>
          {feedbackUser}의<br />
          피드백
        </div>
      </figure>
      <footer css={FooterCss}>{isCollaborate ? <CollaborationBadge variant="gray" /> : null}</footer>
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
