// import useDnaInfo from '~/hooks/dna/useDnaInfo';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import Softskill from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';
import BookmarkIcon from '~/components/icons/BookmarkIcon';
import { CAREER_CARD_IMAGE_BY_GROUP } from '~/constants/dnaImage';
import { type GalleryType } from '~/hooks/api/gallery/useGetGalleryList';
import { BODY_1, BODY_2_REGULAR, HEAD_1_BOLD, HEAD_3_SEMIBOLD } from '~/styles/typo';

interface Props {
  gallery: GalleryType;
}

function Card({ gallery }: Props) {
  // const { group = 'C' } = useDnaInfo(gallery.survey.survey_id);

  const group = 'C';
  const viewTendencies = gallery.survey.tendencies.slice(0, 3);

  return (
    <section css={sectionCss}>
      <div css={topBoxCss}>
        <div css={topInnerCss}>
          <hgroup>
            <h2>{gallery.target.nickname}</h2>
            <p>{gallery.target.job}</p>
          </hgroup>
          <div css={tagWrapperCss}>
            {viewTendencies.map((tendency) => (
              <div key={tendency.name} css={tagItemCss}>
                <Softskill name={tendency.name as Softskills} />
                <span>{tendency.name.replaceAll('_', ' ')}</span>
              </div>
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
            받은 피드백 <span>{gallery.survey.feedback_count}</span>
          </h3>
          <div>
            {gallery.survey.feedbacks.map((feedback) => (
              <p key={feedback}>{feedback}</p>
            ))}
          </div>
        </div>
        <div css={bookmarkWrapperCss}>
          <div>
            <span>{gallery.survey.bookmarked_count}</span>
            <BookmarkIcon isBookmarked={false} size={22} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;

const topBoxCss = css`
  position: relative;
  width: 334px;
  height: 228px;
  padding: 30px 24px 48px;
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
  left: 0;

  width: 100%;
  height: 100%;
`;

const sectionCss = css`
  position: relative;

  overflow: hidden;

  width: 100%;
  max-width: 334px;
  margin: 0 auto;

  border-radius: 20px;
  box-shadow: 0 4px 16px 0 rgb(0 0 0 / 16%);
`;
