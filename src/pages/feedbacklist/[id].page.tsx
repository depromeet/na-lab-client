import React, { type ReactElement, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { css } from '@emotion/react';

import Softskill from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';
import Header from '~/components/header/Header';
import LineThreeDotsIcon from '~/components/icons/LineThreeDotsIcon';
import Pill from '~/components/pill/Pill';
import CollaborationBadge from '~/features/feedback/CollaborationBadge';
import useGetFeedbackById from '~/hooks/api/feedbacks/useGetFeedbackById';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import colors from '~/styles/color';
import { BODY_1, HEAD_1, HEAD_2_BOLD, HEAD_2_REGULAR } from '~/styles/typo';

const Feedback = () => {
  const router = useInternalRouter();
  const { id } = router.query;

  const { data: session } = useSession();
  // todo status에 따라 로딩 처리 필요

  const { data } = useGetFeedbackById('1');

  const convertPositionToKorean = (position: string | undefined) => {
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
    const tendencyElementList: ReactElement[] = [];

    type Color = 'bluegreen' | 'pink' | 'skyblue' | 'yellowgreen' | 'purple';
    const COLOR_ORDER: Color[] = ['bluegreen', 'pink', 'skyblue', 'yellowgreen', 'purple'];

    // NOTE: 현재 mock 데이터에 tendency 데이터가 없어서 제대로 노출되고 있지 않음.
    data?.question.forEach((question) => {
      if (question.type === 'choice' && question.form_type === 'tendency') {
        question.choices?.map((choice: Choice, i: number) => {
          tendencyElementList.push(
            <Pill css={pillCss} color={COLOR_ORDER[i]} key={choice.choice_id}>
              <Softskill name={choice.content as Softskills} />
              {choice.content.replaceAll('_', ' ')}
            </Pill>,
          );
        });
      }
    });

    return tendencyElementList;
  };

  useEffect(() => {
    if (id && data) {
      renderUserInfoTendency();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Header
        title={`${convertPositionToKorean(data?.reviewer.position)} ${data?.reviewer.nickname}의 피드백`}
        // TODO: bottom sheet
        rightButton={
          <button type="button">
            <LineThreeDotsIcon />
          </button>
        }
      />

      <main css={containerCss}>
        <div css={titleCss}>
          <span css={titlebarCss}></span>
          <div css={titleTextCss}>
            {convertPositionToKorean(data?.reviewer.position)} {data?.reviewer.nickname}의 피드백
          </div>
          {data?.reviewer.collaboration_experience ? <CollaborationBadge variant="gray" /> : null}
        </div>

        <div css={userInfoContainerCss}>
          <div css={userInfoTitleCss}>{session?.user?.name} 님의 성향</div>
          <div css={userInfoBodyCss}>{renderUserInfoTendency()}</div>
        </div>

        <div css={questionListCss}>
          {data?.question.map((question: any) => {
            if (question.type === 'short') {
              return (
                <div key={question.question_id}>
                  <div css={questionTitleCss}>Q. {question.title}</div>
                  <div css={questionBodyCss}>{question.reply}</div>
                </div>
              );
            } else if (question.type === 'choice' && question.form_type !== 'tendency') {
              return (
                <>
                  <div css={questionTitleCss}>Q. {question.title}</div>
                  <div css={questionChoiceBodyCss}>
                    {question.choices?.map((choice: Choice) => (
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
