import { useEffect } from 'react';
import { type NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { css, type Theme } from '@emotion/react';

import BottomBar from '~/components/bottomBar/BottomBar';
import Button from '~/components/button/Button';
import FixedSpinner from '~/components/loading/FixedSpinner';
import LoadingHandler from '~/components/loading/LoadingHandler';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import { HEAD_1 } from '~/styles/typo';

const SurveyBasePage: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetSurveyIdByUserStatus();
  const hasSurvey = Boolean(data?.survey_id);

  useEffect(
    function replaceWhenHasSurvey() {
      if (isLoading) return;
      if (hasSurvey) router.replace('/result');
    },
    [hasSurvey, isLoading, router],
  );

  return (
    <LoadingHandler isLoading={isLoading} fallback={<FixedSpinner />}>
      <main css={mainCss}>
        <h1 css={h1Css}>
          질문 폼을 생성하고
          <br />
          동료에게 피드백을 요청해보세요
        </h1>

        <Link href="/survey/create" css={linkCss}>
          <Button color="blue">폼 생성하기</Button>
        </Link>

        <div css={backgroundImageWrapperCss}>
          <Image quality={100} src="/images/survey/base.webp" alt="배경" fill objectFit="cover" />
        </div>
      </main>

      <BottomBar />
    </LoadingHandler>
  );
};

export default SurveyBasePage;

const mainCss = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100dvh;
  padding: 120px 0 130px;
`;

const h1Css = (theme: Theme) => css`
  ${HEAD_1};
  color: ${theme.colors.black};
  text-align: center;
`;

const linkCss = css`
  text-decoration: none;
`;

const backgroundImageWrapperCss = (theme: Theme) => css`
  position: absolute;
  z-index: ${theme.zIndex.belowDefault};
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;
