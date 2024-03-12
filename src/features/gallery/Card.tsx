import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import Softskill from '~/components/graphic/softskills/Softskill';
import BookmarkIcon from '~/components/icons/BookmarkIcon';
import Pill, { type Color } from '~/components/pill/Pill';
import { CAREER_CARD_IMAGE_BY_GROUP } from '~/constants/dnaImage';
import useBookmark from '~/features/gallery/useBookmark';
import useDnaInfo from '~/hooks/dna/useDnaInfo';
import { type SurveyType, type TargetType } from '~/remotes/gallery';
import { BODY_1, BODY_2_REGULAR, DETAIL, HEAD_1_BOLD, HEAD_3_SEMIBOLD } from '~/styles/typo';

interface Props {
  survey: SurveyType;
  target: TargetType;
  isBookmarked: boolean;

  listRefetch?: () => void;
  isMine?: boolean;
  isPreview?: boolean;
}

function Card({ isBookmarked, survey, target, isMine, isPreview, listRefetch }: Props) {
  const { group } = useDnaInfo(survey.survey_id);

  const viewTendencies = survey.tendencies.slice(0, 3);

  const { cancelBookmark, addBookmark } = useBookmark({
    surveyId: survey.survey_id,
    refetch: listRefetch,
  });

  const onBookmarkClick = () => {
    isBookmarked ? cancelBookmark() : addBookmark();
  };

  if (!group) return <CardSkeleton />;

  return (
    <section css={sectionCss}>
      <div css={topBoxCss}>
        <div css={topInnerCss}>
          <hgroup>
            <h2>
              {target.nickname}

              {isMine && <span css={isMineCss}>ME</span>}
            </h2>
            <p>{target.job}</p>
          </hgroup>
          <div css={tagWrapperCss}>
            {viewTendencies.map((tendency, idx) => (
              <Pill color={COLOR_INDEX[idx]} key={tendency.name} css={tagItemCss}>
                <Softskill name={tendency.name} />
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
            받은 피드백 <span>{survey.feedback_count}</span>
          </h3>
          <div>
            {survey.feedbacks.map((feedback) => (
              <p key={feedback}>{feedback}</p>
            ))}
          </div>
        </div>
        <BookmarkButton
          bookmarked_count={survey.bookmarked_count}
          isBookmarked={isBookmarked}
          onClick={onBookmarkClick}
          blocked={isPreview}
        />
      </div>
    </section>
  );
}

export default Card;

interface BookmarkButtonProps {
  bookmarked_count: number;
  isBookmarked: boolean;
  onClick: () => void;
  blocked?: boolean;
}

function BookmarkButton(props: BookmarkButtonProps) {
  return (
    <button
      type="button"
      css={bookmarkWrapperCss}
      onClick={(e) => {
        e.preventDefault();

        !props.blocked && props.onClick();
      }}
    >
      <div>
        <span>{props.bookmarked_count}</span>
        <BookmarkIcon isBookmarked={props.isBookmarked} size={22} />
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
  height: 228px;
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
    display: flex;
    gap: 4px;
    align-items: center;

    padding: 6px 12px;

    color: ${theme.colors.gray_400};

    background-color: ${theme.colors.gray_50};
    border-radius: 22px;
  }

  span {
    ${BODY_1};
    position: relative;
    top: 1px;
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
    display: flex;
    align-items: center;
  }

  p {
    ${BODY_1};
  }
`;

const isMineCss = (theme: Theme) => css`
  ${DETAIL};
  margin-left: 6px;
  padding: 3px 10px;

  color: ${theme.colors.primary_100};

  background-color: ${theme.colors.secondary_200};
  border-radius: 24px;
`;

const tagWrapperCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 200px;
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

  text-decoration: none;

  border-radius: 20px;
  box-shadow: 0 4px 16px 0 rgb(0 0 0 / 16%);
`;

export function CardSkeleton() {
  return <div css={[sectionCss, skeletonCardCss]} />;
}

const skeletonCardCss = css`
  height: 100%;
  min-height: 393px;

  background-color: #dce9fb;
  border-radius: 20px;

  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: #dce9fb;
    }

    50% {
      background-color: #e3f1fc;
    }

    100% {
      background-color: #dce9fb;
    }
  }
`;
