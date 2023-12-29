import React, { type ReactElement, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { css, type Theme } from '@emotion/react';

import Softskill from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';
import Header from '~/components/header/Header';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import Pill from '~/components/pill/Pill';
import SEO from '~/components/SEO/SEO';
import CollaborationBadge from '~/features/feedback/CollaborationBadge';
import useGetFeedbackById from '~/hooks/api/feedbacks/useGetFeedbackById';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import colors from '~/styles/color';
import { BODY_1, HEAD_1, HEAD_2_BOLD, HEAD_2_REGULAR } from '~/styles/typo';
import decodeString from '~/utils/decodeString';

export default function Feedback() {
  const router = useInternalRouter();
  const { id } = router.query;

  const { data: session } = useSession();

  const { data } = useGetFeedbackById(String(id));

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
    data?.question.forEach((question: Question) => {
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
      <SEO />

      <Header
        title={`${convertPositionToKorean(data?.reviewer.position)} ${data?.reviewer.nickname}의 피드백`}
        isContainRemainer
      />

      <main css={containerCss}>
        <div css={titleCss}>
          <span css={titlebarCss}></span>
          <div css={titleTextCss}>
            {convertPositionToKorean(data?.reviewer.position)} {data?.reviewer.nickname}의 피드백
          </div>
          {data?.reviewer.collaboration_experience ? <CollaborationBadge /> : null}
        </div>

        <div css={userInfoContainerCss}>
          <div css={userInfoTitleCss}>{session?.user?.name} 님의 성향</div>
          <div css={userInfoBodyCss}>{renderUserInfoTendency()}</div>
        </div>

        <div css={questionListCss}>
          {data?.question.map((question: Question) => {
            if (question.type === 'short') {
              return (
                <div key={question.question_id}>
                  <div css={questionTitleCss}>Q. {question.title}</div>
                  <div css={questionBodyCss}>
                    {question.reply.map((item, idx) => {
                      return decodeString(item) + (question.reply.length !== idx && '\n');
                    })}
                  </div>
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
}

Feedback.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

const containerCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const titleCss = css`
  ${HEAD_1}
  display: flex;
  align-items: center;
  background-color: ${colors.white};
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

const userInfoContainerCss = (theme: Theme) => css`
  position: relative;
  margin-bottom: 11px;
  background-color: ${colors.white};

  &::before {
    content: '';

    position: absolute;

    /* NOTE: height */
    bottom: -11px;

    /* NOTE: layout padding */
    left: -23px;

    display: block;

    width: 100dvw;
    max-width: ${theme.size.maxWidth};
    height: 11px;

    background-color: ${colors.gray_50};
  }
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
  padding: 50px 0;
  background-color: ${colors.white};
`;

const questionTitleCss = css`
  ${HEAD_2_BOLD}
`;

const questionBodyCss = css`
  ${BODY_1}
  margin-top: 10px;
  margin-bottom: 40px;
  color: ${colors.gray_500};
`;

const questionChoiceBodyCss = css`
  ${BODY_1}
  margin-top: 25px;
  margin-bottom: 40px;
  color: ${colors.gray_500};
`;

const questionChoiceCss = css`
  ${HEAD_2_BOLD}
  display: flex;
  align-items: center;
  justify-content: center;

  width: 343px;
  height: 56px;
  margin-bottom: 10px;

  color: ${colors.gray_500};

  background-color: rgb(99 143 255 / 20%);
  border-radius: 8px;
`;
