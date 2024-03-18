import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { css, type Theme } from '@emotion/react';

import Button from '~/components/button/Button';
import HideIcon from '~/components/icons/HideIcon';
import { DNA_MAP_BY_GROUP } from '~/constants/dna';
import useGetTendencyFeedbackBySurveyId from '~/hooks/api/feedbacks/useGetTendencyFeedbackBySurveyId';
import { BODY_1, BODY_2_BOLD, HEAD_1, HEAD_3_SEMIBOLD } from '~/styles/typo';
import { getResultGroup, type Group } from '~/utils/resultLogic';

interface Props {
  surveyId: string;
  responseCount: number;
}

const MINIMUM_RESPONSE_NUMBER = 3;
const IMAGE_MAP_BY_GROUP: Readonly<Record<Group, string>> = {
  A: '/images/dna/01_banner.webp',
  B: '/images/dna/02_banner.webp',
  C: '/images/dna/03_banner.webp',
  D: '/images/dna/04_banner.webp',
  E: '/images/dna/05_banner.webp',
  F: '/images/dna/06_banner.webp',
} as const;

const DnaBanner: FC<Props> = ({ surveyId, responseCount }) => {
  const { data, isFetching } = useGetTendencyFeedbackBySurveyId(surveyId, {
    enabled: responseCount >= MINIMUM_RESPONSE_NUMBER,
  });

  if (isFetching) {
    return <div css={[sectionBaseCss, dnaSectionCss]}></div>;
  }

  if (responseCount < MINIMUM_RESPONSE_NUMBER) {
    return <NotEnoughResponse responseCount={responseCount} />;
  }

  if (!data) return null;

  const group = getResultGroup(data.question_feedback[0].choices);
  const DNA = DNA_MAP_BY_GROUP[group];

  return (
    <section css={[sectionBaseCss, dnaSectionCss]}>
      <small css={[textBaseCss, BODY_1]}>나의 커리어 DNA는?</small>
      <p css={[textBaseCss, HEAD_1]}>{DNA.title}</p>
      <Link href={`/dna/${surveyId}`} css={anchorCss}>
        <Button css={buttonCss}>자세히 보기</Button>
      </Link>
      <Image priority unoptimized css={imageCss} src={IMAGE_MAP_BY_GROUP[group]} alt="na lab" fill />
    </section>
  );
};

export default DnaBanner;

const dnaSectionCss = css`
  padding: 30px 26px;
`;

const textBaseCss = css`
  color: #fff;
  text-shadow: 0 0 4px 0 rgb(132 155 218 / 70%);
`;

const anchorCss = css`
  all: unset;
`;

const buttonCss = css`
  ${BODY_2_BOLD};
  margin-top: 16px;
  padding: 8px 16px;
`;

interface NotEnoughResponseProps {
  responseCount: number;
}

const NotEnoughResponse: FC<NotEnoughResponseProps> = ({ responseCount }) => {
  return (
    <section css={[sectionBaseCss, notEnoughSectionCss]}>
      <HideIcon />
      <p css={paragraphCss}>
        나의 커리어 DNA 추출을 위한
        <br />
        피드백 데이터가 아직 부족해요.
      </p>
      <small css={smallCss}>
        최소 피드백 갯수 <strong>{responseCount}</strong>/{MINIMUM_RESPONSE_NUMBER}
      </small>

      <Image priority quality={100} css={imageCss} src="/images/dna/05_banner.webp" alt="na lab" fill />
      <div css={imageBlurCss} />
    </section>
  );
};

const sectionBaseCss = css`
  position: relative;
  transform: translateX(-23px);
  width: calc(100% + 23px + 23px);
  height: 170px;
`;

const notEnoughSectionCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const paragraphCss = (theme: Theme) => css`
  ${HEAD_3_SEMIBOLD}
  margin-top: 4px;
  margin-bottom: 17px;
  color: ${theme.colors.secondary_200};
  text-align: center;
`;

const smallCss = (theme: Theme) => css`
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;
  color: ${theme.colors.secondary_200};
  letter-spacing: -0.3px;

  & > strong {
    font-weight: 500;
    color: ${theme.colors.primary_200};
  }
`;

const imageCss = css`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const imageBlurCss = css`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgb(217 227 252 / 60%);
  backdrop-filter: blur(15px);
`;
