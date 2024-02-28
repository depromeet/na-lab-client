// import useDnaInfo from '~/hooks/dna/useDnaInfo';
import { useState } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import Softskill from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';
import BookmarkIcon from '~/components/icons/BookmarkIcon';
import Pill, { type Color } from '~/components/pill/Pill';
import { CAREER_CARD_IMAGE_BY_GROUP } from '~/constants/dnaImage';
import { type SurveyType, type TargetType } from '~/remotes/gallery';
import { BODY_1, BODY_2_REGULAR, HEAD_1_BOLD, HEAD_3_SEMIBOLD } from '~/styles/typo';

interface Props {
  survey: SurveyType;
  target: TargetType;
}

function Card(props: Props) {
  // const { group = 'C' } = useDnaInfo(props.survey.survey_id);

  const group = 'C';
  const viewTendencies = props.survey.tendencies.slice(0, 3);

  return (
    <section css={sectionCss}>
      <div css={topBoxCss}>
        <div css={topInnerCss}>
          <hgroup>
            <h2>{props.target.nickname}</h2>
            <p>{props.target.job}</p>
          </hgroup>
          <div css={tagWrapperCss}>
            {viewTendencies.map((tendency, idx) => (
              <Pill color={COLOR_INDEX[idx]} key={tendency.name} css={tagItemCss}>
                <Softskill name={tendency.name as Softskills} />
                {tendency.name.replaceAll('_', ' ')}
              </Pill>
            ))}
          </div>
        </div>
        <picture>
          <source srcSet={CAREER_CARD_IMAGE_BY_GROUP[group].webp} type="image/webp" />
          <Image
            priority
            unoptimized
            src={CAREER_CARD_IMAGE_BY_GROUP[group].png}
            alt="DNA 이미지"
            width={334}
            height={228}
            css={imageCss}
          />
        </picture>
      </div>
      <div css={feedbackWrapperCss}>
        <div>
          <h3>
            받은 피드백 <span>{props.survey.feedback_count}</span>
          </h3>
          <div>
            {props.survey.feedbacks.map((feedback) => (
              <p key={feedback}>{feedback}</p>
            ))}
          </div>
        </div>
        <BookmarkButton bookmarked_count={props.survey.bookmarked_count} initBookmarked={false} />
      </div>
    </section>
  );
}

export default Card;

function BookmarkButton(props: { bookmarked_count: number; initBookmarked: boolean }) {
  const [isBookmarked, setIsBookmarked] = useState(props.initBookmarked);

  const onClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <button type="button" css={bookmarkWrapperCss} onClick={onClick}>
      <div>
        <span>{props.bookmarked_count}</span>
        <BookmarkIcon isBookmarked={isBookmarked} size={22} />
      </div>
    </button>
  );
}

const COLOR_INDEX: Color[] = ['bluegreen', 'pink', 'skyblue', 'yellowgreen', 'purple'];

const topBoxCss = (theme: Theme) => css`
  position: relative;
  z-index: ${theme.zIndex.default};

  overflow: hidden;

  width: 100%;
  padding: 30px 24px 48px;

  background-color: #dce9fb;

  > div {
    z-index: ${theme.zIndex.above(theme.zIndex.aboveDefault)};
  }

  img {
    z-index: ${theme.zIndex.aboveDefault};
  }
`;

const feedbackWrapperCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px 24px;

  h3 {
    ${HEAD_3_SEMIBOLD};
    margin-bottom: 10px;
    color: ${theme.colors.black};
  }

  p {
    ${BODY_2_REGULAR};
    color: ${theme.colors.gray_500};
  }
`;

const bookmarkWrapperCss = (theme: Theme) => css`
  display: flex;
  justify-content: flex-end;

  > div {
    ${BODY_1};
    display: flex;
    gap: 4px;
    align-items: center;

    padding: 6px 12px;

    color: ${theme.colors.gray_400};

    background-color: ${theme.colors.gray_50};
    border-radius: 22px;
  }

  svg * {
    transition: all 0.2s ease-in-out;
  }
`;

const topInnerCss = (theme: Theme) => css`
  position: relative;
  z-index: ${theme.zIndex.default};

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;

  h2 {
    ${HEAD_1_BOLD};
  }

  p {
    ${BODY_1};
  }
`;

const tagWrapperCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const tagItemCss = (theme: Theme) => css`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;

  padding: 4px 10px;

  background-color: ${theme.colors.white};
  border-radius: 6px;

  ${BODY_1};
`;

const imageCss = (theme: Theme) => css`
  position: absolute;
  z-index: ${theme.zIndex.belowDefault};
  top: 0;
  right: 0;
`;

const sectionCss = css`
  position: relative;

  overflow: hidden;

  width: 100%;
  margin: 0 auto;

  border-radius: 20px;
  box-shadow: 0 4px 16px 0 rgb(0 0 0 / 16%);
`;
