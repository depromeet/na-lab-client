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
    <section css={ReceivedFeedbackCardWrapper}>
      <header css={FeedbackHeader}>{isRead ? null : <UnreadBadgeIcon />}</header>
      <figure css={FeedbackBody}>
        {/* 
        // TODO: 이미지는 추후 3D로 변경 예정
        */}
        <Image css={FeedbackImage} src={feedbackImage} alt="피드백 이미지" />
        <div css={[HEAD_2_BOLD, FeedbackDesc]}>
          {feedbackUser}의<br />
          피드백
        </div>
      </figure>
      <footer css={FeedbackFooter}>{isCollaborate ? <CollaborationBadge variant="gray" /> : null}</footer>
    </section>
  );
};

export default ReceivedFeedbackCard;

const ReceivedFeedbackCardWrapper = css`
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 161px;
  height: 215px;
  padding: 10px 10px 30px;

  background-color: ${colors.white};
  border-radius: 8px;
`;

const FeedbackHeader = css`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 10px;
`;

const FeedbackBody = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FeedbackImage = css`
  width: 60px;
  height: 50px;
  margin: 10px 0;
  border-radius: 5px;
`;

const FeedbackDesc = css`
  display: flex;

  margin: 10px auto;

  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const FeedbackFooter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 35px;
`;
