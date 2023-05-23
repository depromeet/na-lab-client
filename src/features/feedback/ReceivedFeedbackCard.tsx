import React from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';

import colors from '~/styles/color';
import { HEAD_2_BOLD } from '~/styles/typo';

import feedbackImage from '../../../public/images/feedbackImage.png';
import CollaborationBadge from './CollaborationBadge';
import UnreadBadgeIcon from './UnreadBadgeIcon';

const ReceivedFeedbackCard = ({ isRead = false, feedbackUser = '개발자 A', isCollaborate = true }) => {
  return (
    <section css={containerCss}>
      {isRead ? null : <UnreadBadgeIcon floatingTop="8px" floatingRight="8px" />}

      <figure css={BodyCss}>
        {/* 
        // TODO: 이미지는 추후 3D로 변경 예정
        */}
        <Image css={ImageCss} src={feedbackImage} alt="피드백 이미지" />
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
  width: 60px;
  height: 50px;
  margin: 26px auto auto;
  border-radius: 5px;
`;

const DescCss = css`
  display: flex;

  margin: 21px auto 0;

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
  margin-top: 11px;
`;
