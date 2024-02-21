import { css } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';

interface Props {
  // userImage ?:string;
  nickname: string;
  position: string;
  dnaTitle: string;

  projectCount: number;
  feedbackCount: number;
  savedCount: number;
}

function Card(props: Props) {
  return (
    <section css={sectionCss}>
      <div css={profileWrapperCss}>
        {/* <Image /> */}
        <p>{props.nickname}</p>
        <p>{props.position}</p>
        <p>{props.dnaTitle}</p>
      </div>
      <div>
        <div>
          <p>프로젝트</p>
          <p>{props.projectCount}</p>
        </div>
        <div>
          <p>피드백</p>
          <p>{props.feedbackCount}</p>
        </div>
        <div>
          <p>저장됨</p>
          <p>{props.savedCount}</p>
        </div>
      </div>
      <CTAButton color="blue">명함 저장하기</CTAButton>
    </section>
  );
}

export default Card;

const sectionCss = css`
  margin: 0 23px;
`;

const profileWrapperCss = css`
  display: flex;
  gap: 10px;
  align-items: center;

  padding: 30px 24px;

  background: var(--primary-gradation, linear-gradient(111deg, #638fff 0%, #8a85ff 91.14%));
`;
