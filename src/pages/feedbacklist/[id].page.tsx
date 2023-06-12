import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { css } from '@emotion/react';

import Navigation from '~/components/navigation/Navigation.tsx';
import CollaborationBadge from '~/features/feedback/CollaborationBadge';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import colors from '~/styles/color';
import { BODY_1, HEAD_1, HEAD_2_BOLD, HEAD_2_REGULAR } from '~/styles/typo';

import { 긍정적인 } from '../../components/graphic/softskills/긍정적인';
import Pill from '../../components/pill/Pill';

interface Choice {
  choice_id: number;
  content: string;
  order: number;
}

interface Question {
  question_id: number;
  type: string;
  title: string;
  order: number;
  is_read: boolean;
  choices: Choice[];
  reply?: string[];
}

interface Reviewer {
  nickname: string;
  collaboration_experience: boolean;
  position: string;
}

interface Feedback {
  feedback_id: number;
  created_at: string;
  reviwer: Reviewer;
  question: Question[];
}

const Feedback = () => {
  const router = useInternalRouter();
  const { id } = router.query;

  const { data: session } = useSession();

  // const [feedback, setFeedback] = useState<Feedback>(undefined);

  const feedback = {
    feedback_id: 5,
    created_at: '2023-01-24T12:00:00',
    reviewer: {
      nickname: 'A',
      collaboration_experience: true,
      position: 'developer',
    },
    question: [
      {
        question_id: 1,
        type: 'choice',
        form_type: 'tendency',
        title: '성향 예시',
        order: 4,
        is_read: false,
        choices: [
          {
            choice_id: 3,
            content: 'UI',
            order: 1,
          },
          {
            choice_id: 4,
            content: 'UI',
            order: 2,
          },
        ],
      },
      {
        question_id: 10,
        type: 'short',
        form_type: 'strength',
        title: '저는 UX, UI, GUI 중에 어떤 분야에 더 강점이 있나요?',
        order: 5,
        is_read: false,
        reply: [
          '예진이는 개발 관련 지식을 조금 더 공부해봐도\n좋을 것 같아! 요즘 프로덕트 디자이너에겐 개발\n지식을 아는 게 좋은 역량이 될 수 있어.',
          '안녕',
        ],
      },
    ],
  };
  const getFeedback = async () => {
    // todo 데이터 받아오는 작업 다시 해 놓기
    // const feedbackData = await get(`/feedbacks/${id}`);
    // console.log(feedbackData);
    // setFeedback(feedbackData);
  };

  const convertPositionToKorean = (position: string) => {
    if (position === 'developer') {
      return '개발자';
    } else if (position === 'designer') {
      return '디자이너';
    } else if (position === 'pm') {
      return '기획자';
    } else {
      return '지인';
    }
  };

  const renderUserInfoTendency = () => {
    const tendencyList: any[] = [];
    feedback.question.forEach((question) => {
      if (question.type === 'choice' && question.form_type === 'tendency') {
        question.choices?.map((choice) => {
          // todo 일단 '긍정적인'으로 import 중인데 들어오는 데이터에 따라 변경 필요
          tendencyList.push(
            <Pill css={pillCss} color="skyblue">
              <긍정적인 />
              {choice.content}
            </Pill>,
          );
        });
      }
    });

    return tendencyList;
  };

  useEffect(() => {
    if (id) {
      getFeedback();
    }
  }, []);

  return (
    <>
      <Navigation
        title={`${convertPositionToKorean(feedback.reviewer.position)} ${feedback.reviewer.nickname}의 피드백`}
      />
      <main css={containerCss}>
        <header css={titleCss}>
          <span css={titlebarCss}></span>
          <div css={titleTextCss}>
            {convertPositionToKorean(feedback.reviewer.position)} {feedback.reviewer.nickname}의 피드백
          </div>
          {feedback.reviewer.collaboration_experience ? <CollaborationBadge variant="gray" /> : null}
        </header>

        <div css={userInfoContainerCss}>
          <div css={userInfoTitleCss}>{session?.user?.name} 님의 성향</div>
          <div css={userInfoBodyCss}>{renderUserInfoTendency()}</div>
        </div>

        <div css={questionListCss}>
          {feedback.question.map((question) => {
            if (question.type === 'short') {
              return (
                <>
                  <div css={questionTitleCss}>Q. {question.title}</div>
                  <div css={questionBodyCss}>{question.reply}</div>
                </>
              );
            } else if (question.type === 'choice' && question.form_type !== 'tendency') {
              return (
                <>
                  <div css={questionTitleCss}>Q. {question.title}</div>
                  <div css={questionChoiceBodyCss}>
                    {question.choices?.map((choice) => (
                      <div key={choice.choice_id} css={questionChoiceCss}>
                        {choice.content}
                      </div>
                    ))}
                  </div>
                </>
              );
            }
          })}
        </div>
      </main>
    </>
  );
};

export default Feedback;

const containerCss = css`
  display: flex;
  flex-direction: column;

  width: 375px;
  height: 100vh;

  background-color: ${colors.gray_50};
`;

const titleCss = css`
  ${HEAD_1}

  background-color: ${colors.white};

  padding: 23px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const titlebarCss = css`
  display: block;
  width: 4px;
  height: 22px;
  background-color: ${colors.black};
`;

const titleTextCss = css`
  margin: 16px 11px;
`;

const userInfoContainerCss = css`
  margin-bottom: 11px;
  padding: 0 23px;
  background-color: ${colors.white};
`;

const userInfoTitleCss = css`
  ${HEAD_2_REGULAR};

  color: ${colors.gray_400};
`;

const userInfoBodyCss = css`
  display: flex;
  flex-wrap: wrap;

  width: 280px;
  margin-top: 12px;
  margin-bottom: 30px;
`;

const pillCss = css`
  margin: 5.5px 5px;
`;

const questionListCss = css`
  display: flex;
  flex-direction: column;
  padding: 50px 23px;
  background-color: ${colors.white};
`;

const questionTitleCss = css`
  ${HEAD_2_BOLD}
`;

const questionBodyCss = css`
  ${BODY_1}

  color: ${colors.gray_500};
  margin-top: 10px;
  margin-bottom: 40px;
`;

const questionChoiceBodyCss = css`
  ${BODY_1}

  color: ${colors.gray_500};
  margin-top: 25px;
  margin-bottom: 40px;
`;

const questionChoiceCss = css`
  width: 343px;
  height: 56px;
  margin-bottom: 10px;

  color: ${colors.gray_500};
  ${HEAD_2_BOLD}

  background-color: rgb(99 143 255 / 20%);
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
